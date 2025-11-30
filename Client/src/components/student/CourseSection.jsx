import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'

export const CourseSection = () => {
  const {allCourses} = useContext(AppContext)
  return (
    <div className='py-16 md:px-40 px-8'>
<h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
<p>Discover our top-rated courses across various categories. From coding and design to <br/> business and wellness, our courses are crafted to deliver results.</p>
<div className="px-4 md:px-0 my-10 md:my-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {allCourses?.slice(0, 4).map((course) => (
      <CourseCard course={course} key={course._id || course.id} />
    ))}
  </div>
</div>
<Link to={'/course-list'} onClick={()=> scrollTo(0,0)} className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded mt-10"  >Show all courses</Link>

    </div>
  )
}
