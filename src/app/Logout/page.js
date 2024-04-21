'use client'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'
const Logout = () => {
    const onSubmit = () => {
        localStorage.removeItem("username");
        alert('Successfully logged out')
        localStorage.removeItem("userid");
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const userid = localStorage.getItem("userid");
        setIsLoggedIn(username !== null && userid !== null);
    }, []);


    return (
        <div className="min-h-screen flex-col items-center justify-between p-24">
            {isLoggedIn ? (<div>
                <Link href={"/"}>Return to Home</Link>
                <h1 style={{ margin: "20px" }}>Click Here to Log Out</h1>
                <form style={{ margin: "20px" }} onSubmit={onSubmit}>
                    <button type="submit">
                        Log Out
                    </button>
                </form>
            </div>) : (<div>
                <Link href={"/"}>Return to Home</Link>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>Please Login To View The Content</h1>
            </div>)}
        </div>
    )
}

export default Logout
