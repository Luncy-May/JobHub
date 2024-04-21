

import pool from "@/database/postgres";

export async function POST(request) {
    const req = await request.json()
    const client = await pool.connect();
    console.log("Update Username: Database is connected!");
    const oldusername = req.oldusername;
    const newusername = req.newusername;
    // Check if the user already exists
    const checkQuery = {
        text: 'SELECT COUNT(*) FROM users WHERE username = $1',
        values: [newusername],
    };
    try {
        const checkResult = await client.query(checkQuery);
        const userCount = checkResult.rows[0].count; // check if the new username is taken by counting 
        if (userCount === '0') { // the new username does not exist
            const updateQuery = {
                text: 'UPDATE users SET username = $1 where username = $2',
                values: [newusername, oldusername],
            };

            try {
                await client.query(updateQuery);
                client.release();
                return Response.json({
                    success: true,
                    message: "Updating username successfully",
                    newusername: newusername,
                });
            } catch (error) {
                client.release();
                return Response.json({
                    success: false,
                    message: "System error updating username",
                });
            }
        } else { // the new username does exist
            client.release();
            return Response.json({
                success: false,
                message: "The new username is already taken by somebody else!",
            });
        }
    } catch (error) {
        client.release();
        return Response.json({
            success: false,
            message: "System error updating username",
        });
    }
}
