import React, { useContext, useState , useEffect } from 'react'
import { assets } from '../../assets/assets';
import {  useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
const CourseDetail = () => {
  const {id}  = useParams()

  const [courseData, setCourseData]  = useState(null);

  const {allCourses , calculateRating , 
calculateChapterTime , calculateCourseDuration,
 calculateNoOfLecture}  = useContext(AppContext)

 const fetchCourseData = async ()=>{
    const findCourse =  allCourses.find(course => course._id === id)
    setCourseData(findCourse)
   
  }
  // console.log(courseData.courseDescription);

 
  useEffect(()=>{
    fetchCourseData()
  },[allCourses])
  
 return courseData ?  (
   <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
    <div className='absolute top-0 left-0 w-full h-[500px]  -z-1 bg-gradient-to-b from-cyan-100/70'>
    </div>
    {/* left column */}
    <div>
      <h1>
        {courseData.courseTitle}
      </h1>
{courseData.courseDescription && (
  <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0,200) }} />
)}

{/* review and rating  */}
 <div className='flex items-center space-x-2'>
          <p>{calculateRating(courseData)}</p>
       <div className='flex'>
        {[...Array(5)].map((_,i)=> (
          <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-3.5 h-3.5' />
        ))}
       </div>
       <p className='text-gray-500'>({courseData.courseRatings?.length || 0} {courseData.courseRatings?.length > 1 ? 'ratings' : 'rating'})</p>

       <p>{courseData.enrolledStudents?.length} {courseData.enrolledStudents?.length > 1 ?'students' : 'student'}</p>
        </div>

        <p>Course by <span>GreatStack</span></p>

        <div className='pt-8 text-gray-300'>
          <h2>Course Structure</h2>
<div className='pt-5 text-white'>
  {courseData.courseContent.map((chapter , index)=>(
    <div key={index}>
      <div>
        <div>
          <img src={assets.down_arrow_icon} alt="arrow icon" />
          <p>{chapter.chapterTitle}</p>
        </div>
        <p>{ chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}   
        </p>

      </div>
      <div className='overflow-hidden transition-all duration-300 max-h'>
        <ul>
          {
            chapter.chapterContent.map((lecture , i)=>(
              <li key={i} className='flex'>
                <img src={assets.play_icon} alt="play_icon" />
                <div>
                  <p> {lecture.lectureTitle}</p>
                  <div>
                    {lecture.isPreveiwFree &&
                    <p> Preview</p>}
                    <p> 
                      {humanizeDuration(lecture.lectureDuration * 60 * 1000 , {units : ['h', 'm']})}
                    </p>
                  
                  </div>

                </div>
                </li>
            ))
          }
        </ul>

      </div>
      </div>
  ))}

</div>
        </div>
     </div>
 
    {/* right column  */}
      


    </div>
   </>
  ) : <Loading/>
}

export default CourseDetail