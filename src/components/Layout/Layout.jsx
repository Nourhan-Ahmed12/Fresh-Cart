import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    useEffect(()=>{} ,[])
  return ( <>
  <Navbar/>
    <div className="container px-10 mx-auto py-14">
      <Outlet></Outlet>
    </div>
  <Footer/>
  </> )
}
