

import pool from "@/database/postgres";

export async function POST(request) { // json file: { jobname: searchContent } 
  const req = await request.json()
  const client = await pool.connect()
  console.log("Suggestion Process: Database is connected!")
  const jobname = req.jobname;
  const query = {
    text: 'SELECT jobname FROM jobs WHERE jobname LIKE $1',
    values: [jobname], // Use % to match any characters before or after the username
  };
  try {
    const result = await client.query(query)
    const data = result.rows
    client.release()
    return Response.json({
      success: true,
      message: "Congrats! You reach the backend",
      data: data
    });
  } catch (error) {
    client.release()
    return Response.json({
      success: false,
      message: "something wrong with the backend",
    });
  }

}