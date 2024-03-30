import React, { useState } from "react";
import '../styles/test.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Youtube from '../assets/youtube.json'
import Cookies from 'js-cookie';

function Login(){
    const [values, setValues] =useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,values)
        .then(res => {
            if(res.data.Status==="Success"){
                Cookies.set('upvote', res.cookie, { expires: 7 });
                navigate('/')
            }else{
                console.log(res)
            }
        
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="h-screen flex justify-center items-center sign">
            <div className="Card bg-white text-center p-10 rounded-xl border-solid border border-gray-400">
                <h1 className="text-5xl mb-5"><a href="/">DevHub</a></h1>
                <h1 className="text-2xl">Login</h1> 
                <div className="flex justify-center items-center"><Lottie animationData={Youtube} style={{height:170}}></Lottie></div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" placeholder="Email" className=" border px-5 py-2 mt-5 rounded-md w-80" onChange={(e)=>setValues({...values, email:e.target.value})}/>
                    <input type="password" name="password" placeholder="Password" className=" border px-5 py-2 mt-5 rounded-md w-80" onChange={(e)=>setValues({...values,password:e.target.value})}/>
                    <button type="submit" className="butto mt-5 mb-2">Login</button>
                </form>
            <Link to="/signup" className="text-pink-600 font-bold">Create Account</Link>
            </div>
        </div>
    )
}
export default Login;


