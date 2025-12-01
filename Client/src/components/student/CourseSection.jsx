import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

export const CourseSection = () => {
const { allCourses } = useContext(AppContext)

return ( <div className='py-16 px-8 md:px-40 bg-gradient-to-r '> <h2 className='text-3xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400'>
Learn from the best </h2> <p className='text-center text-gray-300 mb-10'>
Discover our top-rated courses across various categories. From coding and design to <br />
business and wellness, our courses are crafted to deliver results. </p>

  <div className="my-10 md:my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white/70">
    {allCourses?.slice(0, 4).map((course, index) => (
      <motion.div
        key={course._id || course.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, type: 'spring', stiffness: 120 }}
        whileHover={{ scale: 1.05, boxShadow: '0px 15px 30px rgba(255,255,255,0.4)' }}
        className='bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300'
      >
        <CourseCard course={course} />
      </motion.div>
    ))}
  </div>

  <div className='text-center'>
    <Link
      to={'/course-list'}
      onClick={() => scrollTo(0, 0)}
      className='text-gray-300 border border-gray-500/40 px-10 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300'
    >
      Show all courses
    </Link>
  </div>
</div>


)
}
