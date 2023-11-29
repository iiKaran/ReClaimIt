import React, { useState, useEffect, useContext } from 'react'
import Axios from '../utils/Axios';
import Card from './Card'
import CopyRight from './CopyRight';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {apiConnector} from '../services/apiConnector'
const BASE_URL = "http://localhost:4000/routes"
// import { AppContext } from '../context/AppContext';
export default function Grid() {
    const { token } = useSelector((state) => state.auth)
    const logIni = true;
    const [login, setLogin] = useState(false);
    const [cards, Setcards] = useState([]);
    async function callPop(){
         try{
        const url = BASE_URL+"/getitems"
         const response = await apiConnector("POST",url); 
         console.log(response.data);
         Setcards(response.data.data);
         }
         catch(err){
            console.log(err); 
            toast.error("cant get items from backend");
         }
    }
  useEffect(()=>{
      callPop();
  },[])
    return (

        <div className='dark:bg-gray-900 min-h-[100vh] bd'>=
            <div className="container my-12 mx-auto ">
                {
                    cards ?<div className="flex flex-wrap      "> 
                    
                        {
                            cards.map((element , index)=>{

                                // console.log(element)
                            return <div className='bd w-[70vw] mx-auto lg:mx-0 lg:w-[25vw]'>
                                <Card name={element.name} desc={element.description} key={index} check={token} img={element.image_url} loc={element.location }  date={element.date}  link={element.link}/>
                            </div>
                            })
                        }

                    </div> : (<div className='text-white text-center'>No card found</div>)}
            </div>
            <CopyRight></CopyRight>
        </div>
    )
}
