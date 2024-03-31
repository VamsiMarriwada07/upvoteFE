import '../styles/navbar.css'
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';



export default function Navbar({auth,name}){
    const navigate = useNavigate()
    const [openProfile, setOpenProfile] = useState(false);
    const handleDelete=()=>{
        Cookies.remove('token');
    }
    return(
        <div className="main flex flex-row items-center justify-around">
            <div className="logo flex flex-row items-center">
                <h1 className='text-5xl font-semibold hover:font-bold hover:text-pink-600 duration-150'><a href="/">DevHub</a></h1>
            </div>
            <div className="options flex flex-row justify-end mr-[-30px]">
                {openProfile && 
                    <div className='flex flex-col dropdown'>
                    <ul className='flex flex-col gap-4 '>
                        <li><button onClick={handleDelete} className="mt-2 text-sm">Logout</button></li>
                    </ul>
        </div>
                }
                {auth && 
                <div className='flex justify-center items-center cursor-pointer' onClick={()=>setOpenProfile((prev)=>!prev)}> 
                    <p className='text-md'>Welcome, <span className='text-xl font-bold'>{name}</span></p>
                    
                </div>
                }
                {!auth && <button className=' font-bold hover:text-pink-600 ease-out duration-40' onClick={()=> navigate('/login')}>Login</button>}
            </div>
        </div> 
    )
}
