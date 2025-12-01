import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar';

const CoursesList = () => {
  const {navigate} = useContext(AppContext);

  return (
   <>
   <div>
    <div className='flex flex-col'>
      <div>
        <h1>Course List</h1>
      <p><span onClick={()=> navigate('/')}>Home</span> / <span onClick={()=> navigate('/course-lits')} >Course List</span> </p>

      </div>
     <SearchBar/>
    </div>
   </div>
   
   </>
        
  )
}

export default CoursesList