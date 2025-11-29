import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'

export const CourseSection = () => {
  return (
    <div className='py-16 md:px-40 px-8'>
<h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
<p>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>
<CourseCard/>
<Link to={'/course-list'} onClick={()=> scrollTo(0,0)} className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded mt-10"  >Show all courses</Link>

    </div>
  )
}
