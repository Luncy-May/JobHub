
import pool from "@/database/postgres";
export async function GET() {
    const client = await pool.connect()
    console.log("Fetchjobs Process: Database is connected!")
    const query = {
        text: 'SELECT * from jobs',
    };
    try {
        const result = await client.query(query)
        const data = result.rows
        console.log("this is the data of jobs fetched from database")
        console.log(data) // [{}, {}, {}, ..., {}]
        client.release()
        return Response.json({
            success: true,
            message: "Congrats! Successfully fetch jobs from database",
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