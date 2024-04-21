import pool from "@/database/postgres";
export async function POST(request) { // json file: { jobname: searchContent } 
    const req = await request.json()
    const client = await pool.connect()
    try {
        const jobid = req.jobid
        const closeQuery = {
            text: 'SELECT status FROM jobs WHERE jobid = $1',
            values: [jobid],
        };

        const closeResult = await client.query(closeQuery);

        if (!closeResult.rows[0].status) { // the job is already closed 
            return Response.json({
                success: false,
                message: "This job has already been closed",
            });
        }
        const query = {
            text: 'UPDATE jobs SET status = $1 WHERE jobid = $2',
            values: [false, jobid], // Use % to match any characters before or after the jobname
        };

        const result = await client.query(query)
        const data = result.rows
        client.release()
        console.log("Successfully retrieved the data")
        try {
            return Response.json({
                success: true,
                message: "Successfully close the job!",
                data: data
            });
        } catch (error) {
            return Response.json({
                success: false,
                message: "something wrong with the backend",
            });
        }
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "something wrong with the backend",
        });
    }
}