'use client';
import Link from "next/link";
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px", marginBottom: "30px" }}>
        <h1>Welcome to JobHub! User: {username}</h1>
        <h1>JobHub is a job board that connects job seekers and employers!</h1>
      </div>
      {isLoggedIn ? (
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Jobs"}>View Jobs</Link></h1>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/JobPost"}>Post a Job</Link></h1>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/ManageJobs"}>Manage Your Job</Link></h1>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Profile"}>Profile</Link></h1>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Logout"}>Logout</Link></h1>
        </div>
      ) : (
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Login"}>Login</Link></h1>
          <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Register"}>Register</Link></h1>
        </div>
      )}
    </main>
  );
}
