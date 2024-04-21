import pool from "@/database/postgres";
export async function POST(request) { // json file: { jobname: searchContent } 
  const req = await request.json()
  const client = await pool.connect()
  console.log("Search Process: Database is connected!")
  const jobname = req.jobname
  console.log(jobname)
  const query = {
    text: 'SELECT * FROM jobs WHERE jobname LIKE $1',
    values: [jobname], // Use % to match any characters before or after the jobname
  };
  try {
    const result = await client.query(query)
    const data = result.rows
    client.release()
    console.log("Successfully retrieved the data")
    try {
      return Response.json({
        success: true,
        message: "Congrats! You reach the backend",
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