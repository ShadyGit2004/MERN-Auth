import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../contexts/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className='text-center mt-20 flex flex-col items-center px-4 text-grey-400'>
      <img className='w-36 h-36 mb-6 rounded-full' src={assets.header_img} alt="hearder_img" />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : "Developer"}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="hand_wave_img" /></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <p className='mb-8 text-gray-800 text-sm max-w-md'>Let's start with a quick product tour and we will have you up and running in no time!</p>
      <button className='rounded-full border border-grey-500 py-2.5 px-8 hover:bg-gray-200 transition-all'>Get started</button>
    </div>
  )
}

export default Header
