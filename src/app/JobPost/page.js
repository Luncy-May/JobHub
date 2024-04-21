"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function JobPost() {
    const [message, setMessage] = useState("")
    const [jobname, setJobname] = useState("")
    const [description, setDescription] = useState("")
    async function onSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/JobPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    userid: userid,

                    jobname: jobname,
                    description: description,
                    publisherid: userid,
                    publishername: username
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            setMessage(data.message)
            alert(data.message)
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            setMessage(error.message)
            console.error(error)
        }
    }
    const handleChangeJobname = (e) => {
        setJobname(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const [username, setUsername] = useState("")
    const [userid, setUserID] = useState("")
    useEffect(() => {
        const username = localStorage.getItem("username");
        const userid = localStorage.getItem("userid");
        setUsername(username)
        setUserID(userid)
        setIsLoggedIn(username !== null && userid !== null);
    }, []);
    return (
        <div className="min-h-screen flex-col items-center justify-between p-24">
            {isLoggedIn ? (<div>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>
                    <h1>Welcome! {username}</h1>
                    <Link href={"/"}>Return to Home</Link>
                </h1>
                <h1>Ready to post a job? Here you go!</h1>
                {message && <div style={{ color: 'red' }}>{message}</div>}
                <form onSubmit={onSubmit}>
                    <h2>What is the title of the job? </h2>
                    <input type="text" name="jobname" placeholder='job title here' onChange={handleChangeJobname} required />
                    <h2>What is the description?</h2>
                    <input type="text" name="description" placeholder='description here' onChange={handleChangeDescription} required />
                    <br></br><button type="submit">
                        Submit
                    </button>
                </form>
            </div>) : (<div>
                <Link href={"/"}>Return to Home</Link>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>Please Login To View The Content</h1>
            </div>)}

        </div>
    );
}
