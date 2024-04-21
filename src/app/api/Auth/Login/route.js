import pool from "@/database/postgres";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const req = await request.json();
    const client = await pool.connect();
    console.log("Login Process: Database is connected!");
    console.log(req)
    const username = req.username;
    const password = req.password;

    const query = {
        text: 'SELECT userid, hashedpassword FROM users WHERE username = $1',
        values: [username],
    };

    try {
        const result = await client.query(query);
        const user = result.rows[0];

        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.hashedpassword);
            const userid = user.userid
            if (passwordMatches) {
                client.release();
                return Response.json({
                    success: true,
                    message: "Congrats! You logged in",
                    userid: userid // or any other user data you want to include
                });
            } else {
                client.release();
                return Response.json({
                    success: false,
                    message: "Incorrect password",
                });
            }
        } else {
            client.release();
            return Response.json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        client.release();
        return Response.json({
            success: false,
            message: "Something went wrong with the backend",
        });
    }
}
