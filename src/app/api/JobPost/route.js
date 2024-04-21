

import pool from "@/database/postgres";

export async function POST(request) {
    const req = await request.json()
    const client = await pool.connect();
    console.log("Post Job Process: Database is connected!");
    console.log("This is the request:")
    console.log(req)
    const jobname = req.jobname
    const description = req.description 
    const applicantnum = 0
    const publisherid = req.publisherid
    const publishername = req.publishername
    console.log(jobname, description, applicantnum, publisherid, publishername)
    // Check if the Job already exists
    const checkQuery = {
        text: 'SELECT COUNT(*) FROM jobs WHERE jobname = $1 AND publisherid = $2 AND publishername = $3',
        values: [jobname, publisherid, publishername],
    };
    try {
        const checkResult = await client.query(checkQuery);
        if (checkResult.rows[0].count === "0") { // Job doesn't exist, proceed with posting 
            const insertQuery = {
                text: 'INSERT INTO jobs (jobname, description, applicantnum, publisherid, publishername) VALUES ($1, $2, $3, $4, $5)',
                values: [jobname, description, applicantnum, publisherid, publishername],
            };
            try {
                await client.query(insertQuery);
                client.release();

                return Response.json({
                    success: true,
                    message: "Job is posted successfully",
                });
            } catch (error) {
                client.release();
                return Response.json({
                    success: false,
                    message: "System Error when posting a Job",
                });
            }
        } else {
            client.release();
            return Response.json({
                success: false,
                message: "Job already exists",
            });
        }
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "System Error! Please try refresh the page",
        });
    }
}
