

import pool from "@/database/postgres";

export async function POST(request) { // { jobid: jobid }
    const req = await request.json()
    const client = await pool.connect()
    console.log("Delete Process: Database is connected!")
    const jobid = req.jobid;
    const query1 = {
        text: 'DELETE FROM applications WHERE appjob = $1',
        values: [jobid],
    };
    // check the entered password and hashed password 
    try {
        const result1 = await client.query(query1)
        const query2 = {
            text: 'DELETE FROM jobs WHERE jobid = $1',
            values: [jobid],
        };
        // check the entered password and hashed password 
        try {
            const result2 = await client.query(query2)
            client.release();
            return Response.json({
                success: true,
                message: "Job is deleted successfully",
            });
        } catch (error) {
            client.release()
            return Response.json({
                success: false,
                message: "System Error! Maybe try refreshing the page?",
            });
        }
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "System Error! Maybe try refreshing the page?",
        });
    }
}