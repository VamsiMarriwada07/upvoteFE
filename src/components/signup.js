import React, { useState } from "react";
import '../styles/test.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){
    const [values, setValues] =useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8081/register",values)
        .then(res => {
            if(res.data.Status==="Success"){
                navigate('/login')
            }else{
                alert("An Error occured")
            }
        
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="h-screen flex justify-center items-center sign">
            <div className="Card bg-white text-center p-10 rounded-xl border-solid border border-gray-400">
                <h1 className="text-5xl mb-5">DevHub</h1>
                <h1 className="text-2xl">Sign Up</h1> 
                <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name"  autoComplete="off" className=" border px-5 py-2 mt-10 rounded-md w-80" onChange={(e)=>setValues({...values,name:e.target.value})}/>
                <input type="text" name="email" placeholder="Email" autoComplete="off" className="border px-5 py-2 mt-5 rounded-md w-80" onChange={(e)=>setValues({...values,email:e.target.value})}/>
                <input type="password" name="password" placeholder="Password" autoComplete="off" className=" border px-5 py-2 mt-5 rounded-md w-80" onChange={(e)=>setValues({...values,password:e.target.value})}/>
                <button type="submit" className="butto mt-5 mb-2">Sign Up</button>
                <p>Existing user? <Link to='/login' className="text-pink-600 font-bold">Log in</Link></p>
                </form>     
            </div>
        </div>
    )
}
export default Signup;