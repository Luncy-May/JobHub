

import pool from "@/database/postgres";
import bcrypt, { hash } from "bcryptjs";

export async function POST(request) {
    const req = await request.json()
    const client = await pool.connect();
    console.log("Register Process: Database is connected!");
    console.log("This is the request:")
    console.log(req)
    const username = req.username;
    const password = req.password;
    const email = req.email;

    // Check if the user already exists
    const checkQuery = {
        text: 'SELECT COUNT(*) FROM users WHERE username = $1',
        values: [username],
    };
    try {
        const checkResult = await client.query(checkQuery);
        const userCount = checkResult.rows[0].count;
        if (userCount === '0') { // User doesn't exist, proceed with registration
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            console.log(hashedPassword)
            const insertQuery = {
                text: 'INSERT INTO users (username, hashedpassword, email) VALUES ($1, $2, $3)',
                values: [username, hashedPassword, email],
            };
            try {
                console.log("try inserting")
                await client.query(insertQuery);
                client.release();
                return Response.json({
                    success: true,
                    message: "User registered successfully",
                });
            } catch (error) {
                client.release();
                return Response.json({
                    success: false,
                    message: "System Error when registering a user",
                });
            }
        } else {
            client.release();
            return Response.json({
                success: false,
                message: "User already exists",
            });
        }
    } catch (error) {
        client.release()
        return Response.json({
            success: false,
            message: "System Error! Please try refresh the page",
        });
    }
}
