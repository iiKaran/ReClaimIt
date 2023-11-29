import React, { useState } from 'react'
import Axios from '../utils/Axios';
import { useNavigate } from 'react-router';
import { setToken } from '../slices/authSlice';
import { apiConnector } from '../services/apiConnector';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {setUser} from '../slices/authSlice'

export default function SignUp() {
  const BASE_URL = "http://localhost:4000/routes"
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(null);
  const [viewOtp, setviewOtp] = useState(null);
  const [validate, setvalidate] = useState(null);
  
  const {user}= useSelector((state)=>state.auth)
  async function validateOtp(e) {
    e.preventDefault();
    if (otp == null) {
      toast.error("Please enter OTP");
    }
    else {
      const url = BASE_URL + "/sendOtp";
      const res = await apiConnector("POST", url, {
        contact: data.number,
        sent: true,
        recOtp: otp
      })
      if (res.data.success) {
        setvalidate(true);

        toast.success("OTP verified");
      }
    }
  }
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: ""
  });
  async function verifyHandler(e) {
    e.preventDefault();
    if (data.number.length != 10) {
      toast.error("Invalid Number, Check Again");
      return;
    }
    console.log(data.number)
    // sending request to the number
    // send otp
    const url = BASE_URL + "/sendOtp";
    const res = await apiConnector("POST", url, {
      contact: data.number,
      sent: false,
      recOtp: ''
    })
    console.log(res);
    toast.success("check Otp and verify it !")
    setviewOtp(true);
  }
  function clearField() {
    setData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
  
    });
  }
  function changeHandler(event) {
    const { name, value } = event.target;

    setData((data) => ({ ...data, [name]: value }));

  }
  function validateInput(event) {
    // Remove non-numeric characters from the input
    let value = event.target.value.replace(/\D/g, '');
    setData((data) => ({ ...data, ["number"]: value }));
  }

  async function HandleSignUp(event) {
    event.preventDefault()
    console.log("the login; data is ", data)
    try {
      const url = BASE_URL + "/signup"
      const response = await apiConnector("POST", url, {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        contact: data.number
      });
      toast.success("user is registered,Login Now");
      // dispatch(setUser(response.data.data))/
      navigate("/login")


      console.log("setteled user", user)
      
    }
    catch (err) {
      toast.error("Check User Details ");
      console.log("error in signup", err)
    }

  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          ReClaimIt
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create A New Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" value={data.username} name="username" id="email" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="developers@gmail.com" required="" />
              </div>
              <div>
                <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={data.email} id="email" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="developers@gmail.com" required="" />
              </div>
              <div className='' >
                <label htmlfor="number" className="block   mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                <div className='flex gap-2'>
                  <input type="tel" value={data.number} onChange={validateInput} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91 9888563650" required="" />


                  {!validate && <button onClick={verifyHandler} className={`dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 cursor-pointer focus:outline-none focus:ring-primary-300 ring-1  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${!data.number.length != 10 ? 'visible' : 'hidden'}`}>
                    Verify
                  </button>
                  }
                  {
                    validate && <button onClick={verifyHandler} className={`dark:text-white bg-green-400 focus:ring-4 cursor-pointer focus:outline-none focus:ring-primary-300 ring-1  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${data.number.length != 10 ? '' : 'hidden'}`}>
                      Verified
                    </button>
                  }
                </div>
                {
                  viewOtp && <div className='flex gap-2  mt-6'>
                    <input type="text" value={otp} onChange={(event) => {
                      setOtp(event.target.value);
                    }} id="otp" className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="X_X_X_X_X" required="" />
                    {!validate && <button onClick={validateOtp} className={`dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 cursor-pointer focus:outline-none focus:ring-primary-300 ring-1  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Validate</button>
                    }
                    {
                      validate && <button onClick={verifyHandler} className={`dark:text-white bg-green-400 focus:ring-4 cursor-pointer focus:outline-none focus:ring-primary-300 ring-1  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${data.number.length != 10 ? '' : 'hidden'}`}>
                        Verified
                      </button>
                    }
                  </div>
                }
              </div>
              <div>
                <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" value={data.password} onChange={changeHandler} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={changeHandler} value={data.confirmPassword} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              {<button type="submit" className={`w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 ring-1  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ${validate ? 'opacity-1' : 'opacity-25'}`} onClick={HandleSignUp}>
                Sign Up</button>}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/login")

                  }} >Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
