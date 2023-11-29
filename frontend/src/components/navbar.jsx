import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Axios from "../utils/Axios"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/authSlice';
import {apiConnector} from '../services/apiConnector'
// import { AppContext } from '../context/AppContext'
export default function
  () {
    const dispatch = useDispatch();
  const {token}= useSelector((state)=>state.auth)
  console.log("the token is ",token)
  
  const [logIn, setLogin]= useState(false);
  const navigate = useNavigate();
  function logOutHandler(){
    toast.error("loging out...")
    dispatch((setToken(null))); 
    dispatch((setUser(null)));
    localStorage.setItem("token",null);
    localStorage.setItem("user",null);
    navigate("/")
  }
  

  return (
    <nav className="bg-white dark:bg-gray-900  w-full border-b border-gray-200 dark:border-gray-600 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ReClaimIt</span>
        </a>
        <div className="flex md:order-2">
          {!token && <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
           onClick={()=>{
            navigate("/login")
           }}
          >Log In</button>}
          {!token && <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4"
          onClick={()=>{
            navigate("/signup")
           }}
          >Sign Up</button>}
          {token && <Link to="/newitem" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4"
          >Add New Item</Link>}
          {token && <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4" onClick={logOutHandler}  >Log Out</button>}
        </div>

      </div>
    </nav>

  )
}
