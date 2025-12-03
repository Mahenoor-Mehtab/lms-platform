import React, { useContext, useState , useEffect } from 'react'
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import humanizeDuration from 'humanize-duration';

const CourseDetail = () => {
  const {id}  = useParams()

  const [courseData, setCourseData]  = useState(null);
  const [openSection , setOpenSection] = useState({});
  const [isAlreadyEnrolled , setIsAlreadyEnrolled] = useState(false)

  const {allCourses , calculateRating , 
calculateChapterTime , calculateCourseDuration,
 calculateNoOfLecture , currency}  = useContext(AppContext)

 const fetchCourseData = async ()=>{
    const findCourse =  allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(()=>{
    fetchCourseData()
  },[allCourses, id])

const toggleSection = (index)=>{
  setOpenSection((prev)=>(
    {...prev , [index] : !prev[index]}
  ))
}

return courseData ? (
  <div className="min-h-screen bg-black p-6 md:p-12 text-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {/* LEFT: Course info */}
      <div className="md:col-span-2 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
          <h1 className="text-3xl font-bold">{courseData.courseTitle}</h1>
          <p className="text-gray-300">by <span className="font-semibold">GreatStack</span></p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_,i)=> (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className='w-4 h-4' />
              ))}
              <span className="text-gray-400">{calculateRating(courseData)} · {courseData.courseRatings?.length || 0} ratings</span>
            </div>
            <span className="text-gray-400">{calculateNoOfLecture(courseData)} lessons</span>
            <span className="text-gray-400">{calculateCourseDuration(courseData)}</span>
          </div>

          <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 250) + (courseData.courseDescription.length > 250 ? '...' : '') }} />
        </motion.div>

        {/* Course Structure */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          {courseData.courseContent.map((chapter, index) => (
            <motion.div key={index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-gray-900 rounded-md">
              <div onClick={() => toggleSection(index)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 transition">
                <div className="flex items-center gap-3">
                  <motion.img src={assets.down_arrow_icon} className={`w-5 h-5`} animate={{ rotate: openSection[index] ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
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
                        {lecture.isPreviewFree && <span className="px-2 py-0.5 bg-green-600 text-white rounded-md text-xs">Preview</span>}
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

      {/* RIGHT: Buy card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="md:col-span-1 bg-gray-900 p-6 rounded-2xl shadow-xl space-y-5">
<img src={courseData.courseThumbnail} alt="course" className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg cover" />
<div className="flex justify-between items-center">
<div>
<p className="text-gray-400 text-sm">Price</p>
<div className="flex items-baseline gap-2">
<span className="text-2xl font-semibold">{currency} {(courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100)).toFixed(2)}</span>
<span className="line-through text-gray-500">{currency} {courseData.coursePrice}</span>
</div>
<span className="text-green-500 text-sm">{courseData.discount}% off</span>
</div>
</div>
<button className={`w-full py-3 rounded-md ${isAlreadyEnrolled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
<div className="text-gray-400 text-sm">
<p className="font-semibold">What's in the course?</p>
<ul className="mt-2 list-disc list-inside space-y-1">
<li>Lifetime access with free updates.</li>
<li>Step-by-step hands-on project guidance.</li>
<li>Downloadable resources and source code.</li>
<li>Quizzes to test your knowledge</li>
<li>Certificate of completion.</li>
</ul>
</div>
</motion.div>
    </div>
  </div>
) : <Loading />
}

export default CourseDetail