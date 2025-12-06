import React from 'react'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetail from './pages/student/CourseDetail'
import Educator from './pages/educator/Educator'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading  from './pages/student/Loading'
import Dashboard from './pages/educator/Dashboard'
import AddCourses from './pages/educator/AddCourses'
import MyCourses from './pages/educator/MyCourses'
import StudentEnrolled from './pages/educator/StudentEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {
  // const location = useLocation();
  // const isEducatorRoute = location.pathname.includes('/educator')
  
  const isEducatorRoute = useMatch('/educator/*')

  return (
    <>
   <div className='text-default min-h-screen  bg-black text-white'>

    { !isEducatorRoute &&    <Navbar/>}
  
    <Routes>
       {/* Student Routes */}
      <Route path='/' element={<Home/>} />
      <Route path='/course-list' element={<CoursesList/>} />
      <Route path='/course-list/:input' element={<CoursesList/>} /> 
      {/* in this input dynamic router we will filter courses */}
      <Route path='/course/:id' element={<CourseDetail />} />
      <Route path='/my-enrollment' element={<MyEnrollments />} />
      <Route path='/player/:courseId' element={<Player />} /> 
      <Route path='/loading/:path' element={<Loading/>}/>

      {/* educator route */}
      <Route path='/educator' element={< Educator/>}>
<Route index path='/educator' element={<Dashboard/>  }/>  {/*  // Index route sirf default tab render hota jab exact parent path /educator ho */}
  <Route path='add-courses' element={ <AddCourses/> }/>
   <Route path='my-courses' element={<MyCourses/> }/>
    <Route path='student-enrolled' element={ <StudentEnrolled/>  }/>
      </Route>
    </Routes>
   </div>
    </>
  )
}

export default App