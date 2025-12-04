import React, { useContext, useState , useEffect } from 'react'
import { assets } from '../../assets/assets';
import {  useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import {  AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube'

const CourseDetail = () => {
  const {id}  = useParams()

  const [courseData, setCourseData]  = useState(null);
  const [openSection , setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(true);
  const [playerData, setPlayerData] = useState(null);

const {allCourses , calculateRating , calculateChapterTime , calculateCourseDuration, calculateNoOfLecture , currency}  = useContext(AppContext)

 const fetchCourseData = async ()=>{
    const findCourse =  allCourses.find(course => course._id === id)
    setCourseData(findCourse)
   
  }
  // console.log(courseData.courseDescription);
  useEffect(()=>{
    fetchCourseData()
  },[allCourses])

  
  const toggleSection = (index)=>{
  setOpenSection((prev)=>(
    {...prev , [index] : !prev[index]}
  ))
}
  
 return courseData ?  (
   <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
    <div className='absolute top-0 left-0 w-full h-[500px]  -z-1 bg-gradient-to-b from-cyan-100/70'>
    </div>
    {/* left column */}
    <div className="max-w-xl z-10 text-gray-500">
        <h1 className="font-semibold text-gray-800 underline mb-2 hover:font-bold animate-bounce text-4xl">
            {courseData.courseTitle}
          </h1>
{   courseData.courseDescription && (
  <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0,200) }} />
)}

{/* review and rating  */}
  <div className="flex items-center flex-wrap gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200">
          
          <p  className="text-2xl font-bold text-yellow-500">{calculateRating(courseData)}</p>
       <div className='flex space-x-1'>
        {[...Array(5)].map((_,i)=> (
          <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-3.5 h-3.5 cursor-pointer' />
        ))}
       </div>
       <p className='text-gray-500'>({courseData.courseRatings?.length || 0} {courseData.courseRatings?.length > 1 ? 'ratings' : 'rating'})</p>

       <p>{courseData.enrolledStudents?.length} {courseData.enrolledStudents?.length > 1 ?'students' : 'student'}</p>
        </div>

        <p>Course by <span>GreatStack</span></p>

      {/* Course Structure */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          {courseData.courseContent.map((chapter, index) => (
            <motion.div key={index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-gray-900 rounded-md">
              <div onClick={() => toggleSection(index)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 transition">
                <div className="flex items-center gap-3">
                  <motion.img src={assets.down_arrow_icon} className={`w-5 h-5`} animate={{ rotate: openSection[index] ? 180 : "" }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
                  <div>
                    <p className="font-semibold">{chapter.chapterTitle}</p>
                    <p className="text-gray-400 text-sm">{chapter.chapterContent.length} lectures · {calculateChapterTime(chapter)}</p>
                  </div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openSection[index] && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="p-3 border-t border-gray-700 space-y-2">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-md transition">
                        <div className="flex items-center gap-3">
                          <img src={assets.play_icon} alt="play" className="w-6 h-6" />
                          <p>{lecture.lectureTitle}</p>
                        </div>
                        {lecture.isPreviewFree && <span className="px-2 py-0.5 bg-green-600 text-white rounded-md text-xs cursor-pointer" 
                        onClick={()=>setPlayerData({
                                  videoId: lecture.lectureUrl.split("/").pop(),
                                })}
                        >Preview</span>}
                        <span className="text-gray-400 text-sm">{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
 <div className='mt-10 p-6 rounded-lg relative'>
  {/* Background */}
  <div className='absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg -z-10'></div>
  
  {/* Card content */}
  <h3 className='text-lg font-bold mb-2'>Course Description</h3>
  <p className='text-gray-300 leading-relaxed' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
</div>
     </div>
 
    {/* right column  */}
     <div className="max-w-[420px] z-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] shadow-amber-100">

      {
      playerData ?
        <YouTube videoId={playerData.videoId} opts={{playerVars: {autoplay : 1}}} iframeClassName='w-full aspect-video' />
        : <img src={courseData.courseThumbnail} alt="" />
      }
         
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
              />
              <p className="text-red-500">
                {" "}
                <span className="font-medium">5 days</span> left at this price
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-3xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(3)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-gray-500 md:text-lg">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNoOfLecture(courseData)} lessons</p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white cursor-pointer font-semibold" onClick={()=> setIsAlreadyEnrolled((prev)=> !prev)}>
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the Course
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-base list-disc">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step,Hand's Project Guidence</li>
                <li>Easy to Download Resource and as well as Code</li>
                <li>Certificate of Completion </li>
              </ul>
            </div>
          </div>
        </div>
      


    </div>
   </>
  ) : <Loading/>
}


export default CourseDetail