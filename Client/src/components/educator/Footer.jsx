import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
   <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-white/10 bg-[#2a3873] py-4 animate-fade-in'>
    <div className='flex items-center gap-4'>
      <img className="hidden md:block w-20 transform transition-transform duration-300 hover:scale-105" src={assets.logo} alt='logo' />
      <div className='hidden md:block h-7 w-px bg-white/20' />
      <p className='py-4 text-center text-xs md:text-sm text-slate-400'>
        Copyright 2025 @ GreatStack. All Right Reserved.
      </p>
    </div>
    <div className='flex items-center gap-3 max:md:mt-4'>
      <a href="#" className='transition-transform duration-300 hover:scale-110'>
        <img src={assets.facebook_icon} alt="facebook_icon" />
      </a>
      <a href="#" className='transition-transform duration-300 hover:scale-110'>
        <img src={assets.twitter_icon} alt="twitter_icon" />
      </a>
      <a href="#" className='transition-transform duration-300 hover:scale-110'>
        <img src={assets.instagram_icon} alt="instagram_icon" />
      </a>
    </div>
   </footer>
  )
}

export default Footer