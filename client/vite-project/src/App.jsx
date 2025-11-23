import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/verify-account' element={<VerifyEmail/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App


