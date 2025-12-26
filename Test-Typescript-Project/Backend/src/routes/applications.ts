import { Router } from "express";
import { pool } from "../db";

const router = Router();

/* 
Creates new application for a program.
*/
router.post("/", async (req, res) => 
{
    const { programId, firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email)
    {
        return res.status(400).json({ error: "Missing fields" });
    }

    const client = await pool.connect();

    try
    {
        await client.query("BEGIN");
        //Need the "do update", in order to get an id when there is a conflict (no op)"
        const applicantResult = await client.query( 
            `
            INSERT INTO applicants (first_name, last_name, email) 
            VALUES ($1, $2, $3)
            ON CONFLICT(email)
            DO UPDATE SET email = EXCLUDED.email
            RETURNING id
            `,
            [firstName, lastName, email]
        ); 
        const applicantId: number = applicantResult.rows[0].id;
        const applicationResult = await client.query(
            `
            INSERT INTO applications (applicant_id, program_id, status)
            VALUES ($1, $2, 'submitted')
            RETURNING id
            `,
            [applicantId, programId]
        );

        await client.query("COMMIT");

        res.status(201).json({ applicationId: applicationResult.rows[0].id, status:"submitted" });

    }
    catch (err: any)
    {
        await client.query("ROLLBACK");
        if (err.code === "2305") //unique_violation code for PostgreSQL (23 is integrity violation, 505 is the specific)
        {
            return res.status(409).json({ error: "Applicant already has an application for this program" });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
    finally //This code section will always occur
    {
        client.release();
    }

}); 
//Patching are for partial modifications (in this case, on applications)
router.patch("/:id", async (req, res) =>
{
    const { status } = req.body;
    const applicationId = Number(req.params.id);

    if (!["approved", "rejected"].includes(status))
    {
        return res.status(400).json({ error: "Invalid status" });
    }
    
    const result = await pool.query(
        `
        UPDATE applications
        SET status = $1, reviewed_at = NOW()
        WHERE id = $2 AND status = 'submitted'
        RETURNING id
        `,
        [status, applicationId]
    );
    if (result.rowCount === 0)
    {
        return res.status(400).json({ error: "Application wasn't updated" });
    }
    
    res.json({ id: applicationId, status });

});

export default router;