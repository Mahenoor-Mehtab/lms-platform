import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const MyEnrollments = () => {
  const { enrolledCourses , calculateCourseDuration } = useContext(AppContext)
  return (
   <>
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold '>My Enrollment</h1>
    <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
    <thead className='text-gray-200 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
    <tr className=''>
      <th className='px-4 py-3 font-semibold truncate'> Course  </th>
       <th className='px-4 py-3 font-semibold truncate'> Duration  </th>
        <th className='px-4 py-3 font-semibold truncate'> Completed  </th>
         <th className='px-4 py-3 font-semibold truncate'> Status </th>
      </tr>
  </thead>
  <tbody className='text-gray-300'>
    {
      enrolledCourses.map((course , index)=>(
      <tr key={index} className='border-b border-gray-500/20'>
          <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'> 
            <img src={course.courseThumbnail} alt=""
            className='w-14 sm:w-24 md:w-28'/>
            <div className='flex-1'>
              <p className='mb-2 max-sm:text-sm'>
                {course.courseTitle}

              </p>
            </div>
          </td>
          <td>
{ calculateCourseDuration(course)}
          </td>
          <td>
            4 / 10 <span>Lectures </span>
          </td>
          <td>
            <button> On going </button>
          </td>
          <td>

          </td>

        </tr>
      ))}
  </tbody>
</table>

        </div>
   </>
  )
}

export default MyEnrollments