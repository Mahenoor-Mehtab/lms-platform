import { Link, useLocation } from "react-router-dom"
import { assets } from "../../assets/assets"
import {  useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const {navigate} = useContext(AppContext);
const isCourseListPage = location.pathname.includes('/course-list')

const {openSignIn} = useClerk();
const {user} = useUser();


  return (
  <>
  <div className={`${isCourseListPage ? 'bg-white': 'bg-cyan-100/70'}  flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4`}>

    <img src={assets.logo} alt={"Logo"} height={"100px"} width={"100px"} className="w-28 lg:w-32 cursor-pointer" onClick={()=> navigate('/')}/>
  <div className="hidden md:flex items-center gap-5 text-gray-500">
      <div className="flex items-center gap-5" >
     {
      user && <>
       <button>Become Educator</button> |
      <Link to="/my-enrollments"> My Enrollment</Link>
      </>
     }
      
    </div>
    {
user ? <UserButton/>  :
 <button className="bg-blue-600 text-white px-5 py-2 rounded-full" onClick={() => openSignIn()}>Create Account</button>
 }

   
  </div>

  {/* For Mobile device */}
  <div className="md:hidden flex items-center justify-between  text-gray-500 gap-2 sm:gap-5">
    <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
      {user && <>
      <button> Enroll you </button>
      <Link to='/my-enrollment'>My Enrollment</Link>
      </>}

    </div>
  
       {
user ? <UserButton/>  :
 <button className="bg-blue-600 text-white px-5 py-2 rounded-full" onClick={() => openSignIn()}>{ !user && <img src={assets.user_icon} alt=""/> }</button>
 }

  </div>

  
  </div>
  
  </>
  )
}

export default Navbar