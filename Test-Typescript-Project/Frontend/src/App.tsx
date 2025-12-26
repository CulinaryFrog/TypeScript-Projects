import { useEffect, useState } from "react";
import { createApplication, fetchApplications, reviewApplication } from "./api";

const PROGRAM_ID : number = 0;
//Vite runs on port 5132, so can see this button there for testing
export default function App() {
  const [apps, setApps] = useState<any[]>([]);

  async function load() {
    setApps(await fetchApplications(PROGRAM_ID));
  }

  useEffect(() => 
  {
    load();
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          createApplication({
            programId: PROGRAM_ID,
            firstName: "Example2",
            lastName: "example2",
            email: "test2@example.com",
          }).then(load)
        }
      >
        Submit Example Application
      </button>
      {apps.map((a) => (
        <div key={a.applicationId}>
          {a.applicant.email} — {a.status}
          {a.status === "submitted" && (
            <>
              <button onClick={() => reviewApplication(a.applicationId, "approved").then(load)}>
                Approve
              </button>
              <button onClick={() => reviewApplication(a.applicationId, "rejected").then(load)}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
