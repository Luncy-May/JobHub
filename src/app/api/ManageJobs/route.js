
import pool from "@/database/postgres";
export async function POST(request) {
    const req = await request.json()
    const client = await pool.connect()
    console.log("manage jobs Process: Database is connected!")
    const userid = req.userid
    const query = {
        text: 'SELECT * from jobs where publisherid = $1',
        values: [userid]
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        console.log("this is the data of manageable jobs fetched from database")
        console.log(data) // [{}, {}, {}, ..., {}]
        client.release()
        return Response.json({
            success: true,
            message: "Congrats! Successfully fetch manageable jobs from database",
            data: data
        });
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "System error fetching jobs",
        });
    }
}