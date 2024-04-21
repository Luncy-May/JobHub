'use client';
import React ,{useState, useEffect} from 'react'

import Link from 'next/link'
const Dashboard = () => {
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
    <h1 style = {{fontWeight:"bold",fontSize:"20px", marginTop:"20px",marginBottom: "20px"}}><Link href = {"/"}>Return to Home</Link></h1> 
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
