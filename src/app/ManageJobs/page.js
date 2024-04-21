"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Job from "../Jobs/Job";
export default function Jobs() {
    const [JobsList, setJobsList] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchContent, setSearchContent] = useState("")
    useEffect(() => {
        const getJobs = async () => {
          try {
            const res = await fetch('http://localhost:3000/api/ManageJobs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    userid: localStorage.getItem("userid")
                }),
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
            console.log("this is the searchContent:")
            console.log(searchContent)
            const response = await fetch('http://localhost:3000/api/Search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    userid: localStorage.getItem("userid"),

                    jobname: searchContent
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            setError(data.message)
            setJobsList(data.data)
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
    async function onOpen(event, jobid) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            console.log("this is the searchContent:")
            console.log(searchContent)
            const response = await fetch('http://localhost:3000/api/OpenJobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    userid: localStorage.getItem("userid"),
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
    async function onClose(event, jobid) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            console.log("this is the searchContent:")
            console.log(searchContent)
            const response = await fetch('http://localhost:3000/api/CloseJobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    userid: localStorage.getItem("userid"),
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
    console.log("This is the jobsList:");
    console.log(JobsList);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const userid = localStorage.getItem("userid");
        setIsLoggedIn(username !== null && userid !== null);
    }, []);
    return (
        <div className="min-h-screen flex-col jobs-center justify-between p-24">
            {isLoggedIn ? (<div>
                <h1>Welcome! {localStorage.getItem("username")}</h1>
                <Link href={"/"}>Return to Home</Link>
                <h2>Search A Job (Case-sensitive):</h2>
                <form onSubmit={onSearch}>
                    <input type="text" name="name" placeholder='type a name here' onChange={handleChange} />
                    <br></br><button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                <h1>You can manage your jobs right here: </h1>
                <div>
                    {JobsList && JobsList.map((job, index) => (
                        <div key={index}>
                            <Job
                                jobname={job.jobname}
                                description={job.description}
                                applicantNum={job.applicantnum}
                                publisherid={job.publisherid}
                                publishername={job.publishername}
                                status={job.status}
                            />
                            <div style={{ display: "flex", marginBottom: "20px"}}>
                            <form onSubmit={(e) => onOpen(e, job.jobid)} style={{ marginRight:'20px' }}>
                                <button type="submit">Open</button>
                            </form>
                            <form onSubmit={(e) => onClose(e, job.jobid)}>
                                <button type="submit">Close</button>
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
