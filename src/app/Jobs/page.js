"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Job from "./Job";
export default function Jobs() {
  const [JobsList, setJobsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchContent, setSearchContent] = useState("")

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/FetchJobs/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await res.json();
        console.log(data); // Check the structure of the response data
        setJobsList(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getJobs();
  }, []);
  async function onSearch(event) {
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
          username: username,
          userid: userid,

          jobname: searchContent
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      setError(data.message)
      if (data.success) { setJobsList(data.data) }
      console.log("This is the jobs list so far:")
      console.log(JobsList)
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onApply(event, jobid) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      
      const response = await fetch('http://localhost:3000/api/ApplyJobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          userid: userid,
          jobid: jobid
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      setError(data.message)
      alert(data.message)
      console.log("This is the jobs list so far:")
      console.log(JobsList)
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  async function onWithdraw(event, jobid) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      
      const response = await fetch('http://localhost:3000/api/WithDrawJobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          userid: userid,
          jobid: jobid
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      setError(data.message)
      alert(data.message)
      console.log("This is the jobs list so far:")
      console.log(JobsList)
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
    <div className="min-h-screen flex-col jobs-center justify-between p-24">
      {isLoggedIn ? (<div>
        <h1>Welcome! {username}</h1>
        <Link href={"/"}>Return to Home</Link>
        <h2>Search A Job (Case-sensitive):</h2>
        <form onSubmit={onSearch}>
          <input type="text" name="name" placeholder='type a name here' onChange={handleChange} />
          <br></br><button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        <h1 style = {{marginBottom:"20px"}}>Available Jobs: </h1>
        <div>
          {JobsList && JobsList.map((job, index) => (
            <div key={index} >
              <Job
                jobname={job.jobname}
                description={job.description}
                applicantNum={job.applicantnum}
                publisherid={job.publisherid}
                publishername={job.publishername}
                status={job.status}
              />
              <div style={{ display: "flex", marginBottom: "20px"}}>
              <form onSubmit={(e) => onApply(e, job.jobid)} style={{marginRight:"20px"}}>
                <button type="submit" disabled={!job.status}>Apply</button>
              </form>
              <form onSubmit={(e) => onWithdraw(e, job.jobid)}>
                <button type="submit" disabled={!job.status}>Withdraw</button>
              </form>
              </div>
            </div>
          ))}
        </div>
      </div>) : (<div>
        <Link href={"/"}>Return to Home</Link>
        <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}>Please Login To View The Content</h1>
      </div>)}

    </div>
  );
}
