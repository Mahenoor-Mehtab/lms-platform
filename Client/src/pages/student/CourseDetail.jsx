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
   
    <div className="min-h-screen w-full py-12 px-6 md:px-12  text-gray-100  ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="z-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {courseData.courseTitle}
          </h1>

          {courseData.courseDescription && (
            <p className="text-gray-200 max-w-prose" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0,250) + '...' }} />
          )}

          {/* review and rating  */}
          <div className="flex items-center flex-wrap gap-3 mb-2 bg-gray-900 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/6">
            <p className="text-2xl font-bold text-yellow-400">{calculateRating(courseData)}</p>
            <div className='flex space-x-1'>
              {[...Array(5)].map((_,i)=> (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-4 h-4' />
              ))}
            </div>
            <p className='text-gray-300'>({courseData.courseRatings?.length || 0} {courseData.courseRatings?.length > 1 ? 'ratings' : 'rating'})</p>

            <p className='text-gray-300 ml-2'>{courseData.enrolledStudents?.length} {courseData.enrolledStudents?.length > 1 ?'students' : 'student'}</p>
          </div>

          <p className="text-sm text-gray-300">Course by <span className="font-semibold text-white">GreatStack</span></p>

          {/* Course Structure */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Course Structure</h2>
            <div className="space-y-3">
              {courseData.courseContent.map((chapter, index) => (
                <motion.div key={index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="bg-gray-900 rounded-md overflow-hidden">
                  <div onClick={() => toggleSection(index)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/8 transition">
                    <div className="flex items-center gap-3">
                      <motion.img src={assets.down_arrow_icon} className={`w-5 h-5`} animate={{ rotate: openSection[index] ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
                      <div>
                        <p className="font-semibold text-white">{chapter.chapterTitle}</p>
                        <p className="text-gray-300 text-sm">{chapter.chapterContent.length} lectures · {calculateChapterTime(chapter)}</p>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {openSection[index] && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="p-3 border-t border-white/8 space-y-2 bg-white/4">
                        {chapter.chapterContent.map((lecture, i) => (
                          <div key={i} className="flex items-center justify-between p-2 hover:bg-white/6 rounded-md transition">
                            <div className="flex items-center gap-3">
                              <img src={assets.play_icon} alt="play" className="w-6 h-6" />
                              <p className="text-gray-100">{lecture.lectureTitle}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {lecture.isPreviewFree && <span className="px-2 py-0.5 bg-green-500 text-white rounded-md text-xs cursor-pointer" 
                                onClick={()=>setPlayerData({ videoId: lecture.lectureUrl.split("/").pop(), })}
                              >Preview</span>}
                              <span className="text-gray-300 text-sm">{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <div className='mt-6 p-6 rounded-lg bg-gray-900 border border-white/8'>
            <h3 className='text-lg font-bold text-white mb-2'>Course Description</h3>
            <p className='text-gray-200 leading-relaxed' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="z-10 rounded-lg overflow-hidden bg-gray-900 backdrop-blur-sm border border-white/8 shadow-lg">

          { playerData ?
            <YouTube videoId={playerData.videoId} opts={{playerVars: {autoplay : 1}}} iframeClassName='w-full aspect-video' />
            : <img src={courseData.courseThumbnail} alt="" className="w-full object-cover max-h-64" />
          }

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-4"
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
              />
              <p className="text-yellow-300 text-sm">
                <span className="font-medium text-white">5 days</span> left at this price
              </p>
            </div>

            <div className="flex gap-3 items-center pt-3">
              <p className="text-white md:text-3xl text-2xl font-semibold">
                {currency}{(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(3)}
              </p>
              <p className="md:text-lg text-gray-300 line-through">
                {currency}{courseData.coursePrice}
              </p>
              <p className="text-gray-300 md:text-lg">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm md:text-base gap-4 pt-3 text-gray-300">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNoOfLecture(courseData)} lessons</p>
              </div>
            </div>

            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-amber-500 text-slate-900 cursor-pointer font-semibold hover:scale-[1.01] transition-transform" onClick={()=> setIsAlreadyEnrolled((prev)=> !prev)}>
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-white">What's in the Course</p>
              <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-200">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step, Hands-on Project Guidance</li>
                <li>Easy to Download Resources and Code</li>
                <li>Certificate of Completion</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
   </>
  ) : <Loading/>
}


export default CourseDetail
