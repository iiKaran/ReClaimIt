import React, { useState , useEffect, useContext} from 'react'
import Axios from '../utils/Axios';
import Card from './Card'
import CopyRight from './CopyRight';
import { useSelector } from 'react-redux';
// import { AppContext } from '../context/AppContext';
export default function Grid() {
   const {token}= useSelector((state)=>state.auth)
     
 
    const logIni = true;
        const [login,setLogin] = useState(false);

    return (

      
        <div className='dark:bg-gray-900 min-h-[100vh] '>
            <div className="container my-12 mx-auto px-13 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">

                    <Card check={token} name="Spex" desc="this is the description for the product" loc="d2,semianar hall" img="https://imgs.search.brave.com/gc8KIMp5qtciq5QVScnrnF26UHVmlc9dFxmHZodKV2U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/dW5nbGFzc2VzXzEy/MDMtODcwMy5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw" ></Card>
                    <Card check={token} name="Mobile Phone" desc="this is the description for the product" loc="d2,semianar hall" img="https://imgs.search.brave.com/C48Z6g5qivqGhw0osFL7yMiVHqBVVV9IJvqlQJe4gZM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9k/YW0vcG9sLUNPLTEy/NjA2Ni0yMzEwMjNf/REVSLWViZTVlNWFh/LWY0MzEtNGRkMC1i/MjE3LWQ2OWMwZWJm/YWEwNC5qcGc7bWF4/SGVpZ2h0PTMwMjtt/YXhXaWR0aD01MDQ" ></Card>
                    <Card check={token} name="Praticle Notebook" desc="this is the description for the product" loc="d2,semianar hall" img="https://imgs.search.brave.com/cEGJJgCJKi782sIStA_ymW94mEycEDMryQdPk-pPPxA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9u/b3RlYm9va183NDE5/MC0yNzI1LmpwZz9z/aXplPTYyNiZleHQ9/anBn" ></Card>
                    <Card check={token} name="Mobile Cover" desc="this is the description for the product" loc="d2,semianar hall" img="https://imgs.search.brave.com/C48Z6g5qivqGhw0osFL7yMiVHqBVVV9IJvqlQJe4gZM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9k/YW0vcG9sLUNPLTEy/NjA2Ni0yMzEwMjNf/REVSLWViZTVlNWFh/LWY0MzEtNGRkMC1i/MjE3LWQ2OWMwZWJm/YWEwNC5qcGc7bWF4/SGVpZ2h0PTMwMjtt/YXhXaWR0aD01MDQ" ></Card>

                </div>
            </div>
            <CopyRight></CopyRight>
        </div>
    )
}
