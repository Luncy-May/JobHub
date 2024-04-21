import pool from "@/database/postgres";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const req = await request.json();
    const client = await pool.connect();
    console.log("Update Password: Database is connected!");
    const username = req.username;
    const oldpassword = req.oldpassword;
    const newpassword = req.newpassword;
    console.log(username, oldpassword, newpassword);

    // Check if the user exists and retrieve hashed password
    const checkQuery = {
        text: 'SELECT hashedpassword FROM users WHERE username = $1',
        values: [username],
    };

    try {
        const checkResult = await client.query(checkQuery);
        if (checkResult.rows.length === 1) {
            const hashedPasswordFromDB = checkResult.rows[0].hashedpassword;
            const passwordsMatch = await bcrypt.compare(oldpassword, hashedPasswordFromDB);
            if (passwordsMatch) {
                const hashedPassword = await bcrypt.hash(newpassword, 10);
                const updateQuery = {
                    text: 'UPDATE users SET hashedpassword = $1 WHERE username = $2',
                    values: [hashedPassword, username],
                };
                try {
                    await client.query(updateQuery);
                    client.release();
                    return Response.json({
                        success: true,
                        message: "Updating password successfully",
                    });
                } catch (error) {
                    client.release();
                    return Response.json({
                        success: false,
                        message: "System error updating password",
                    });
                }
            } else {
                client.release();
                return Response.json({
                    success: false,
                    message: "Incorrect old password",
                });
            }
        } else {
            client.release();
            return Response.json({
                success: false,
                message: "User does not exist, please login first",
            });
        }
    } catch (error) {
        client.release();
        return Response.json({
            success: false,
            message: "System error updating password",
        });
    }
}
