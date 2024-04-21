

import pool from "@/database/postgres";

export async function POST(request) { // { userid: userid }
    const req = await request.json()
    const client = await pool.connect()
    console.log("Delete Process: Database is connected!")
    const userid = req.userid;
    const query1 = {
        text: 'DELETE FROM applications WHERE appuser = $1',
        values: [userid],
    };
    // check the entered password and hashed password 
    try {
        const result1 = await client.query(query1)
        const query2 = {
            text: 'DELETE FROM jobs WHERE publisherid = $1',
            values: [userid],
        };
        // check the entered password and hashed password 
        try {
            const result2 = await client.query(query2)
            const query3 = {
                text: 'DELETE FROM users WHERE userid = $1',
                values: [userid],
            };
            // check the entered password and hashed password 
            try {
                const result3 = await client.query(query3)
                client.release();
                return Response.json({
                    success: true,
                    message: "User is deleted successfully",
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
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "System Error! Maybe try refreshing the page?",
        });
    }
}