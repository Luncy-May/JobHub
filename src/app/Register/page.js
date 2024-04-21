'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const response = await fetch('http://localhost:3000/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      setError(data.message)
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

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
    <div className="min-h-screen flex-col items-center justify-between p-24">
      <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <h1>Welcome! {username}</h1>
        <Link href={"/"}>Return to Home</Link>
      </h1>
      <h1>Ready to register? Here you go!</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <h2>What is your username?</h2>
        <input type="text" name="username" placeholder='username here' onChange={handleChangeUsername} required />
        <h2>What is your password?</h2>
        <input type="password" name="password" placeholder='password here' onChange={handleChangePassword} required />
        <h2>What is your email?</h2>
        <input type="email" name="email" placeholder='email here' onChange={handleChangeEmail} required />
        <br></br><button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
