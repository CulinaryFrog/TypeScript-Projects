const API_BASE = "http://localhost:3000"; //Todo, also get this from .env file like I did in backend

export async function createApplication(data: any) {
  const res = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) 
  {
    throw new Error((await res.json()).error);
  }
}

export async function fetchApplications(programId: number) {
  const res = await fetch(`${API_BASE}/programs/${programId}/applications`);
  return res.json();
}

export async function reviewApplication(id: string, status: string) {
  await fetch(`${API_BASE}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
