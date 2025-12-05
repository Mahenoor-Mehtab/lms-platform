import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-courses', icon: assets.add_icon },
    { name: 'My Couses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]

  return isEducator && (
    <div className='md:w-64 w-16 min-h-screen py-3 flex flex-col border-r border-white/10 bg-[#060b12] backdrop-blur-sm shadow-xl animate-fade-in'>
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-8 gap-3 transition-all duration-300 
            ${
              isActive 
                ? 'bg-white/10 border-r-4 border-indigo-400 text-slate-100' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`
          }
        >
          <img src={item.icon} alt='' className='w-6 h-6 opacity-90' />
          <p className='hidden md:block text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar