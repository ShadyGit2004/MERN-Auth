import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../contexts/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  let navigate = useNavigate();
  let {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent);
  
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl+"/api/auth/logout");

      if(data.success){
        setIsLoggedin(false);
        setUserData(false);
        toast.success(data.message)
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message)      
    }
  }

  const sendVerificationOtp = async () =>{
    try {

      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl+"/api/auth/send-verify-otp");

      if(data.success){
        toast.success(data.message);
        navigate("/verify-account");
      }else{
        toast.error(data.message);
      }
      
    } catch (e) {
      toast.error(e.message) 
    }
  };

  return (
    <div className='w-full flex justify-between items-center py-4 px-20 sm:24px absolute top-0'>
      <img onClick={navigate("/")} src={assets.logo} alt="" className='w-28 sm:w-32'/>
      {userData ? 
      <div className='h-8 w-8 flex justify-center items-center bg-black text-white relative rounded-full group'>
        {userData.name[0].toUpperCase()}
          <div className='p-3 absolute hidden group-hover:block right-0 top-0 text-black rounded pt-10 z-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
              <li onClick={handleLogout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
      </div> : 
      <button onClick={()=>navigate("/login")} className='flex items-center gap-2 text-grey-200 border border-grey-100 py-2 px-6 rounded-full hover:bg-gray-200 transition-all'>Login <img src={assets.arrow_icon} alt="" /></button>
      }
      </div>
  )
}

export default Navbar
