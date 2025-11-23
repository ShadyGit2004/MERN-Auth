import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../contexts/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const [state, setState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      
    e.preventDefault();

    axios.defaults.withCredentials = true;

    if (state === "Sign Up") {
      
      const {data} = await axios.post(backendUrl+"/api/auth/register", {username, email, password});

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message)
      }

    } else {
      const {data} = await axios.post(backendUrl+"/api/auth/login", {username, password});

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message)
      }
    }

    } catch (error) {      
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-indigo-400'>
      <img onClick={()=>{navigate("/")}} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
      <div className='bg-slate-900 rounded-lg p-10 shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='font-semibold text-3xl text-center mb-3 text-white'>{state === "Sign Up" ? "Create account" : "Login" }</h2>
        <p className='text-center text-sm mb-6'>{ state === "Sign Up" ? "Create your account" : "Login to your account!" }</p>

        <form onSubmit={onSubmitHandler}>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.person_icon} alt="" />
            <input onChange={e=>setUsername(e.target.value)} value={username} className='bg-transparent outline-none' type="text" placeholder='Username' required/>
          </div>
         { state === "Sign Up" &&  
         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e=>setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email' required/>
          </div>
          }
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={e=>setPassword(e.target.value)} value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required/>
          </div>

          {state !== "Sign Up" && <p onClick={()=>{navigate("/reset-password")}} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>}
          
          <button className='w-full py-2.5 font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>{state}</button>
        </form>


          {state === "Sign Up" ? (<p className='text-xs text-center text-gray-400 mt-4'>Already have an account? &nbsp; <span onClick={()=>{setState("Login")}} className='cursor-pointer text-blue-400 underline'>Login here</span></p>) : (<p className='text-xs text-center text-gray-400 mt-4'>Don't have an account? &nbsp; <span onClick={()=>{setState("Sign Up")}} className='cursor-pointer text-blue-400 underline'>Sign Up</span></p>)}
      
      

      </div>
    </div>
  )
}

export default Login
