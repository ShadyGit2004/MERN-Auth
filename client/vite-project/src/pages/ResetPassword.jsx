import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../contexts/AppContext'

const ResetPassword = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl} = useContext(AppContent);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(0);
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

  const onEmailSubmit = async (e) => {

    e.preventDefault();
   
    try {
      const {data} = await axios.post(backendUrl+"/api/auth/send-reset-otp", {email});

      if(data.success){
       toast.success(data.message); 
       setIsEmailSent(true);
      }else{
        toast.error(data.message); 
      }
    } catch (e) {
      toast.error(e.message)
    }
   
  }


  const onOtpSubmit = (e) => {
    e.preventDefault();   
    const otpArr = inputRefs.current.map(e => e.value);
    const otp = otpArr.join("");
    setOtp(otp);
    setIsOtpSent(true);    
  }

  const onPasswordSubmit = async (e) => {
    e.preventDefault();

    try {

      const {data} = await axios.post(backendUrl+"/api/auth/reset-password", {email, otp, newPassword});

      if(data.success){
        toast.success(data.message);
        navigate("/login");
      }else{
        toast.error(data.message);
      }
      
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400'>      
      <img onClick={()=>{navigate("/")}} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />

    {/* Email form */}
      {!isEmailSent && 
      <form onSubmit={onEmailSubmit} className='w-96 bg-slate-900 p-8 rounded-lg text-sm shadow-lg'>
      <h1 className='text-white text-2xl text-semibold text-center
       mb-4'>Reset password</h1>
      <p className='text-center mb-6 text-indigo-300'>Enter your registerd email id.</p>
         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c] text-indigo-300'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e=>setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email id' required/>
          </div>
          <button className='w-full mt-2 py-2.5 font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Submit</button>
        </form>}


    {/* Otp form */}
      {isEmailSent && !isOtpSent && 
      <form onSubmit={onOtpSubmit} className='w-96 bg-slate-900 p-8 rounded-lg text-sm shadow-lg'>
      <h1 className='text-white text-2xl text-semibold text-center
       mb-4'>Reset password OTP</h1>
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
      <button className='w-full mt-2 py-2.5 font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Submit</button>
      </form>}
  

    {/* password form */}

    {isEmailSent && isOtpSent && 
    <form onSubmit={onPasswordSubmit} className='w-96 bg-slate-900 p-8 rounded-lg text-sm shadow-lg'>
      <h1 className='text-white text-2xl text-semibold text-center
       mb-4'>New password</h1>
      <p className='text-center mb-6 text-indigo-300'>Enter your new password</p>
         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c] text-indigo-300'>
            <img src={assets.lock_icon} alt="password_icon" />
            <input onChange={e=>setNewPassword(e.target.value)} value={newPassword} className='bg-transparent outline-none' type="password" placeholder='Password' required/>
          </div>
          <button className='w-full mt-2 py-2.5 font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Submit</button>
      </form>
    }


    </div>
  )
}

export default ResetPassword
