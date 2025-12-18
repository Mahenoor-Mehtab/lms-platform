import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {
  const { enrolledCourses , calculateCourseDuration ,  navigate} = useContext(AppContext)
 const [progressArray , setProgressArray] = useState([
  {lectureCompleted: 2 , totalLecture: 4},
   {lectureCompleted: 3 , totalLecture: 5},
    {lectureCompleted: 4 , totalLecture: 6},
     {lectureCompleted: 5 , totalLecture: 7},
      {lectureCompleted: 6 , totalLecture: 8},
       {lectureCompleted: 7 , totalLecture: 9},
        {lectureCompleted: 10 , totalLecture: 10},
         {lectureCompleted: 9 , totalLecture: 11},

 ])

  return (
   <>
    <div className='md:px-36 px-8 pt-10 mb-20'>
      <h1 className='text-2xl font-semibold '>My Enrollment</h1>
    <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
    <thead className='text-gray-200 border-b border-gray-300 text-sm text-left '>
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
      <tr key={index} className='border-b border-gray-500'>
          <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'> 
            <img src={course.courseThumbnail} alt=""
            className='w-14 sm:w-24 md:w-28'/>
            <div className='flex-1'>
              <p className='mb-2 max-sm:text-sm'>
                {course.courseTitle}  </p>
<Line strokeWidth={2}  percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLecture : 0} className='bg-gray-300 rounded-full' />

            </div>
          </td>
          <td className='px-4 py-3 '>
{ calculateCourseDuration(course)}
          </td>
          <td className='px-4 py-3 '>
            {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLecture}` }<span> Lectures </span>
          </td>
          <td className='px-4 py-3 max-sm:text-right'>
            <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white cursor-pointer hover:bg-blue-800  rounded-2xl'onClick={()=> navigate('/player/'+ course._id)}>{
          progressArray[index] &&  progressArray[index].lectureCompleted / progressArray[index].totalLecture  === 1 ? "Completed" : "On Going"
          
          }</button>
          </td>
          <td>

          </td>

        </tr>
      ))}
  </tbody>
</table>

        </div>
        <Footer/>
   </>
  )
}

export default MyEnrollments