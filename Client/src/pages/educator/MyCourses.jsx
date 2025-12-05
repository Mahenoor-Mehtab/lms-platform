import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../student/Loading';

const MyCourses = () => {
  const {currency , allCourses} = useContext(AppContext);
  const [courses , setCourses] = useState(null);

  const fetchEducatorCourses = async ()=>{
    setCourses(allCourses)
  }

  useEffect(()=>{
    fetchEducatorCourses()
  },[allCourses])

  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 animate-fade-in'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium text-slate-100'>My Courses</h2>
        <div className='overflow-x-auto'>
          <table className='md:table-auto table-fixed w-full text-sm'>
            <thead className='text-slate-200 border-b border-white/6'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate text-left'>All Courses</th>
              <th className='px-4 py-3 font-semibold truncate text-left'>Earnings</th>
               <th className='px-4 py-3 font-semibold truncate text-left'>Students</th>
                <th className='px-4 py-3 font-semibold truncate text-left'>Published On</th>
            </tr>
            </thead>
            <tbody className='text-slate-300'>
              {
                courses.map((course)=>(
                  <tr key={course._id} className='border-b border-white/6 hover:bg-white/3 transition-colors'>
                    <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                      <img src={course.courseThumbnail} alt="Course Image" className='w-16 h-10 object-cover rounded-md shadow-sm' />
                      <span className='truncate hidden md:block text-slate-100'>
                        {course.courseTitle} </span>
                         </td>
<td className='px-4 py-3 text-slate-100'>{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
</td>
<td className='px-4 py-3'>{course.enrolledStudents.length}</td>
<td className='px-4 py-3'>
  {new Date(course.createdAt).toLocaleDateString()}
</td>

                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>


      </div>
       
      
    </div> 
  ) : <Loading/>
}

export default MyCourses