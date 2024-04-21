'use client'
import React, { useState, useEffect } from 'react'

const Job = ({ jobname, description, applicantNum, publisherid, publishername, status }) => {
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
    <div style={{ border: "1px black solid", width: "25%" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{jobname}</h1>
      <h2 style={{ fontSize: "18px", display: "inline-flex" }}>Contact: {publishername}</h2> <p style={{ fontSize: "12px" }}>{status}</p>
      <p style={{ fontWeight: "bold" }}>Description:</p>
      <p>{description}</p>
    </div>
  )
}

export default Job
