import React, { createContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration'
import {useAuth , useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext()

export function  AppContextProvider({ children }){

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const {getToken} = useAuth();
  const {user} = useUser()

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [allCourses, setAllCourse] = useState([]);
  const [isEducator, setisEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData , setUserData] = useState(null);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    try{
      const {data}=await axios.get(backendUrl +'/api/course/all')
      if(data.success){
        setAllCourse(data.courses)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(`Error come during fetching the data from backend: ${error.message}`);
       toast.error(error.message)
    }
  }

  // Fetch user data:
  const fetchUserData = async()=>{
    if(user.publicMetadata.role === 'educator'){
      setisEducator(true);
    }
    try{
      const token = await getToken();
      const {data} = await axios.get(backendUrl+'/api/user/data' , {headers: {Authorization : `Bearer ${token}`}})
      if(data.success){
        setUserData(data.user);
      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)

    }
  }

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  // Function to Calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] })  // “Return the time in a format like ‘1 hour, 20 minutes’, jisme time ko pehle milliseconds me convert kiya gaya aur output sirf hours + minutes me mile.”
  }

  // Function to Calculate Course Duration:
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  };

  // Function to calculate No of Lecture in teh course:
  const calculateNoOfLecture = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach(chapter => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length
      }
    });
    return totalLectures

  }

  // Fetch User Enrolled Courses:
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses)

  }
  useEffect(() => {
    fetchAllCourses()
    fetchUserEnrolledCourses()
  }, [])



  useEffect(()=>{
    if(user) {
      fetchUserData()
    }
  },[user])


  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator, setisEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLecture,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl, userData, setUserData, getToken, fetchAllCourses
  }
  return (
    <>
      <AppContext.Provider value={value} >
        {children}
      </AppContext.Provider>
    </>
  )
}

