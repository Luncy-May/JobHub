import pool from "@/database/postgres";

export async function POST(request) {
    const req = await request.json();
    const client = await pool.connect();

    try {
        const appjob = req.jobid;
        const appuser = req.userid;

        // Check if the job application already exists
        const checkQuery = {
            text: 'SELECT * FROM applications WHERE appjob = $1 AND appuser = $2',
            values: [appjob, appuser],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult.rows.length === 0) {
            return Response.json({
                success: false,
                message: "Job application does not exist",
            });
        }

        // Insert the job application
        const insertQuery = {
            text: 'DELETE FROM applications where appjob = $1 and appuser = $2',
            values: [appjob, appuser],
        };

        await client.query(insertQuery);

        return Response.json({
            success: true,
            message: "Job is withdrawed successfully",
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: "System Error! Please try refreshing the page",
        });
    } finally {
        client.release();
    }
}
