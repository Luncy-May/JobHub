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

        if (checkResult.rows.length > 0) { // the user already applies the job
            return Response.json({
                success: false,
                message: "Job application already exists",
            });
        }
        const closeQuery = {
            text: 'SELECT status FROM jobs WHERE jobid = $1',
            values: [appjob],
        };

        const closeResult = await client.query(closeQuery);

        if (!closeResult.rows[0].status) { // the job is closed 
            return Response.json({
                success: false,
                message: "This job is no longer accepting applications!",
            });
        }
        // Insert the job application
        const insertQuery = {
            text: 'INSERT INTO applications (appjob, appuser) VALUES ($1, $2)',
            values: [appjob, appuser],
        };

        await client.query(insertQuery);

        return Response.json({
            success: true,
            message: "Job application submitted successfully",
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
