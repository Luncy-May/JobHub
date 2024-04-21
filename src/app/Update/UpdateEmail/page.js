'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [CurrentEmail, setCurrentEmail] = useState("")
  const [NewEmail, setNewEmail] = useState("")
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const response = await fetch('http://localhost:3000/api/Update/Email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          userid: localStorage.getItem("userid"),

          oldemail: CurrentEmail,
          newemail: NewEmail,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      setError(data.message)
      setCurrentEmail("")
      setNewEmail("")
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeCurrentEmail = (e) => {
    setCurrentEmail(e.target.value)
  }
  const handleChangeNewEmail = (e) => {
    setNewEmail(e.target.value)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");
    setIsLoggedIn(username !== null && userid !== null);
  }, []);
  return (
    <div className="min-h-screen flex-col items-center justify-between p-24">
      {isLoggedIn ? (<div><h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <h1>Welcome! {localStorage.getItem("username")}</h1>
        <Link href={"/"}>Return to Home</Link>
        <h1 style={{ fontWeight: "bold", fontSize: "20px" }}><Link href={"/Profile"}>Profile</Link></h1>
      </h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={onSubmit}>
          <h2>What is your current email?</h2>
          <input type="email" name="oldemail" placeholder='current email here' onChange={handleChangeCurrentEmail} required />
          <h2>What is your new email?</h2>
          <input type="email" name="newemail" placeholder='new email here' onChange={handleChangeNewEmail} required />
          <br></br><button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form></div>) : (<div>
          <Link href={"/"}>Return to Home</Link>
          <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>Please Login To View The Content</h1>
        </div>)}

    </div>
  )
}
