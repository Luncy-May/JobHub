import React, { useState, useEffect } from 'react'

const Job = ({ jobname, description, applicantNum, publisherid, publishername, status }) => {
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
