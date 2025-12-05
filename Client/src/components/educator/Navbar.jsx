import { assets, dummyEducatorData } from "../../assets/assets"
import {UserButton , useUser} from '@clerk/clerk-react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const educatorData = dummyEducatorData
  const {user} = useUser();
  return (
    <div className="flex items-center justify-between px-4 md:px-8  border-gray-300 py-3 bg-gradient-to-r from-[#3ab4ab] via-[#1f4c6c] to-[#070514] bg-gradient-to-r from-[#7638c6] via-[#1f4c6c] to-[#070514] shadow-[0_5px_25px_rgba(255,255,255,0.6)]">
       <Link to='/'>
      <img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-300 relative">
        <p>Hi! {user ? user.fullName : 'Developer'}</p>
        {user ? <UserButton/> : <img className="max-w-8" src={assets.profile_img}/> }
      </div>
    </div>
  )
}

export default Navbar