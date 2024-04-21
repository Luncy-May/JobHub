import pool from "@/database/postgres";

export async function POST(request) {
    const req = await request.json();
    const client = await pool.connect();
    console.log("Update Email: Database is connected!");
    const username = req.username;
    const oldemail = req.oldemail;
    const newemail = req.newemail;

    // Check if the user exists and the old email is correct
    const checkQuery = {
        text: 'SELECT email FROM users WHERE username = $1 AND email = $2',
        values: [username, oldemail],
    };

    try {
        const checkResult = await client.query(checkQuery);
        if (checkResult.rows.length === 1) { // User and old email are correct
            const updateQuery = {
                text: 'UPDATE users SET email = $1 WHERE username = $2',
                values: [newemail, username],
            };

            try {
                await client.query(updateQuery);
                client.release();

                return Response.json({
                    success: true,
                    message: "Updating email successfully",
                });
            } catch (error) {
                client.release();

                return Response.json({
                    success: false,
                    message: "System error updating email",
                });
            }
        } else {
            client.release();
            return Response.json({
                success: false,
                message: "Invalid username or old email",
            });
        }
    } catch (error) {
        client.release();
        return Response.json({
            success: false,
            message: "System error updating email",
        });
    }
}
