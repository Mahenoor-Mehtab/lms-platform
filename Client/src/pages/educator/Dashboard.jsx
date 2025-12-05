import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const {currency} = useContext(AppContext);
  const [dashboardData , setDashboardData] = useState(null)

  const fetchDashboardData= ()=>{
    setDashboardData(dummyDashboardData);
  }

  useEffect(()=>{
    fetchDashboardData()
  },[])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pb-0 animate-fade-in'>
      <div className='space-y-5 w-full'>
        <div className='flex flex-wrap gap-6 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-white/10 px-5 py-4 rounded-lg bg-gradient-to-b from-[#071018] to-[#08121b]'>
            <img src={assets.patients_icon} alt="patients_icon" className='w-8 h-8' />
            <div>
              <p className='text-2xl font-medium text-slate-100'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-sm text-slate-400'>Total Enrollments</p>
            </div>
          </div>

          <div className='flex items-center gap-3 shadow-card border border-white/10 px-5 py-4 rounded-lg bg-gradient-to-b from-[#071018] to-[#08121b]'>
            <img src={assets.appointments_icon} alt="appointments_icon" className='w-8 h-8' />
            <div>
              <p className='text-2xl font-medium text-slate-100'>{dashboardData.totalCourses}</p>
              <p className='text-sm text-slate-400'>Total Courses</p>
            </div>
          </div>

          <div className='flex items-center gap-3 shadow-card border border-white/10 px-5 py-4 rounded-lg bg-gradient-to-b from-[#071018] to-[#08121b]'>
            <img src={assets.earning_icon} alt="earning_icon" className='w-8 h-8' />
            <div>
              <p className='text-2xl font-medium text-slate-100'>{currency} {dashboardData.totalEarnings}</p>
              <p className='text-sm text-slate-400'>Total Earning</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className='pb-4 text-lg font-medium text-slate-100'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-[#061018] border border-white/6'>
            <table className='table-fixed md:table-auto w-full'>
              <thead className='text-slate-200 border-b border-white/6 text-sm text-left bg-transparent'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell w-12'>#</th>
                  <th className='px-4 py-3 font-semibold'> Student Name</th>
                  <th className='px-4 py-3 font-semibold'> Course Title</th>
                </tr>
              </thead>

              <tbody className='text-sm text-slate-300'>
                {
                  dashboardData.enrolledStudentsData.map((item,index)=>(
                    <tr key={index} className='border-b border-white/6 hover:bg-white/2 transition-colors'>
                      <td className='px-4 py-3 text-center hidden sm:table-cell '>{index+1}</td>
                      <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                        <img src={item.student.imageUrl} alt="Profile" className='w-9 h-9 rounded-full object-cover shadow-sm' />
                        <span className='truncate'>{item.student.name}</span>
                      </td>
                      <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  ) : <Loading/>
}

export default Dashboard
