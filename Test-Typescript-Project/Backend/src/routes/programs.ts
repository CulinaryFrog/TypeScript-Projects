import { Router } from "express";
import { pool } from "../db";

const router = Router();

type ApplicationRow = {
  applicationId: number;                // BIGINT id from applications
  status: "submitted" | "approved" | "rejected";
  submittedAt: Date;                    // submitted_at timestamp
  firstName: string;                    // applicant first_name
  lastName: string;                     // applicant last_name
  email: string;                        // applicant email
};

//GET /programs/:programId/applications
router.get("/:programId/applications", async (req, res) => {
  const programId = Number(req.params.programId);

  try {
    const result = await pool.query<ApplicationRow>(
      `
      SELECT
        a.id AS "applicationId",
        a.status,
        a.submitted_at AS "submittedAt",
        ap.first_name AS "firstName",
        ap.last_name AS "lastName",
        ap.email
      FROM applications a
      JOIN applicants ap ON ap.id = a.applicant_id
      WHERE a.program_id = $1
      ORDER BY a.submitted_at ASC
      `,
      [programId]
    );

    // row is now typed as ApplicationRow instead of implicitly any (had this warning before)
    const applications = result.rows.map((row : ApplicationRow) => ({
      applicationId: row.applicationId,
      status: row.status,
      submittedAt: row.submittedAt,
      applicant: {
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
      },
    }));

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
