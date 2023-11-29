import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({check, name ,loc, date, desc, img,link}) {
  var dateObject = new Date(date );
  return (
    <div className="my-5    mb-3    m-6">
    {/* Article */}
    <article className="overflow-hidden bd w-[100%] rounded-lg shadow-lg">
      <a href="#">
        <img
          alt="Placeholder"
          className="block h-auto w-full"
          src={img}
        />
      </a>
      <header className="flex items-center justify-between leading-tight p-3 px-5  lg:px-6  md:p-4">
        <h1 className="text-lg">
          <a className="no-underline hover:underline text-black dark:text-white font-medium" href="#">
            {name}
          </a>
        </h1>
        <p className="text-grey-darker text-sm dark:text-white ">{dateObject.getDay()+"-"+dateObject.getMonth()  + "-"+  dateObject.getFullYear() }</p>
      </header>
      <p className="desc dark:text-white p-2 opacity-60 mt-2 mb-2">
       {desc}
       </p>
      <footer className="flex items-center  justify-between leading-none p-4 md:p-4 pr-7">
          
        <a
          className="flex items-center no-underline hover:underline text-black"
          href="#"
        >
          <img
            alt="Placeholder"
            className="block rounded-full lg:w-[30px] lg:h-[auto] h-[40px]"
            src="https://img.freepik.com/free-vector/location_53876-25530.jpg"
          />
          <p className="ml-2 text-sm dark:text-white lg:font-medium ">{loc}</p>
        </a>
        <a
          className="no-underline text-grey-darker hover:text-red-dark"
          href="#"
        >
          {check && <Link className="text-white bg-green-500 p-3 rounded-md px-5 font-medium " to={link }>Claim</Link>}
          {!check && <Link className="text-white bg-green-500 p-3 rounded-md px-5 font-medium " to="/login">login to claim</Link>}
        </a>
      </footer>
    </article>
    {/* END Article */}
  </div>
  )
}
