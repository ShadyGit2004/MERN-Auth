import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
     if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
     }
  }

  const handleKeyDown = (e, index) => {
    if(e.key==='Backspace' && e.target.value === "" && index > 0){      
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData("text");
    const pasteArr = paste.split('');
    pasteArr.forEach((c, index)=>{
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = c;
      }
    })
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArr = inputRefs.current.map(e => e.value);
      const otp = otpArr.join('');

      const {data} = await axios.post(backendUrl+"/api/auth/verify-account", {otp});

      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate("/");
      }else{
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message)
      
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400'>      
      <img onClick={()=>{navigate("/")}} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />

      <form onSubmit={submitHandler} className='w-96 bg-slate-900 p-8 rounded-lg text-sm shadow-lg'>
      <h1 className='text-white text-2xl text-semibold text-center
       mb-4'>Verify OTP</h1>
      <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
      <div className='flex justify-between mb-8'>
        {Array(6).fill(0).map((_, index)=>(
          <input className='h-12 w-12 bg-[#333a5c] text-white text-center text-xl rounded-md' type="text" 
          ref={e => inputRefs.current[index] = e}
          onInput={(e)=> handleInput(e, index)}
          onKeyDown={(e)=> handleKeyDown(e, index)}
          onPaste={handlePaste} 
          key={index} 
          maxLength="1" 
          required/>
        ))}
      </div>
      <button className='w-full py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-indigo-900'>Verify email</button>
      </form>
    </div>
  )
}

export default VerifyEmail
