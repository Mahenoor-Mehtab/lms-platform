import {  AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

const getCourseData = ()=>{
  enrolledCourses.map((course)=>{
    if(course._id === courseId){
      setCourseData(course)
    }
  })
}

 const toggleSection = (index)=>{
  setOpenSection((prev)=>(
    {...prev , [index] : !prev[index]}
  ))
}
  

useEffect(()=>{
  getCourseData();
} , [])

  return courseData ? (
   <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 mb-20'>
{/* left column */}
<div className='text-gray-300'>
  <h2 className='text-xl font-semibold'>Course Structure</h2>
   {courseData && courseData.courseContent.map((chapter, index) => (
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
                          <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play" className="w-6 h-6" />
                          <p>{lecture.lectureTitle}</p>
                        </div>
                        {lecture.lectureUrl && <span className="px-2 py-0.5 bg-green-600 text-white rounded-md text-xs cursor-pointer" 
                        onClick={()=>setPlayerData({
                                 ...lecture , chapter: index + 1 , lecture: i+1
                                })}
                        >Watch</span>}
                        <span className="text-gray-400 text-sm">{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className='flex items-center gap-2 py-3 mt-10'>  
            <h1 className='text-xl font-bold'>
              Rate this Course:
            </h1>
            <Rating initialRating={0}/>
          </div>

</div>

{/* right column  */}
<div className='md:mt-7'>
  {playerData ? (
  <div>
     <YouTube videoId={playerData.lectureUrl.split('/').pop()} opts={{playerVars: {autoplay : 1}}} iframeClassName='w-full aspect-video' />
<div className='flex justify-between items-center mt-5'>
   <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
   <button className='text-blue-600 px-5'>{ false ? 'Completed' : 'Mark Complete'}</button>
</div>
    </div>
 )
 : <img src={courseData.courseThumbnail} alt="" />

  }
 </div>
    </div>
    <Footer/>
   </>
  )  : <Loading/>
}

export default Player