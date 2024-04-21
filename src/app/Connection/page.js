'use client';
import React, { useState , useEffect} from 'react'
import Link from 'next/link';
export default function Connection() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchContent, setSearchContent] = useState("")

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      
      const response = await fetch('http://localhost:3000/api/Search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            userid:localStorage.getItem("userid"),
            
            jobname: searchContent
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

  const handleChange = (e) => {
    setSearchContent(e.target.value)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const userid = localStorage.getItem("userid");
        setIsLoggedIn(username !== null && userid !== null);
    }, []);
  return (
    <div className="min-h-screen flex-col items-center justify-between p-24">
    {isLoggedIn ? (<div></div>) : (<div>
      <Link href={"/"}>Return to Home</Link>
      <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>Please Login To View The Content</h1>
    </div>)}
      <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <h1>Welcome! {localStorage.getItem("username")}</h1>
        <Link href={"/"}>Return to Home</Link>
      </h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>This is Your Search Content:</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder='type a name here' onChange={handleChange} />
        <br></br><button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
