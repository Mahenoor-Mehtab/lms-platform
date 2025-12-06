import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';

const AddCourses = () => {
  const quillRef = useRef(null); // Jisme Quill ko attach karna hai (actual DOM div)
  const editorRef = useRef(null); // Quill ke object ko store karne ke liye

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  })

  // Function for adding chapter
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters(prev => [...prev, newChapter]);
      }


      }
       else if (action === 'remove') {
        setChapters(prev => prev.filter((chapter) => chapter.chapterId !== chapterId));

      } else if (action === 'toggle') {
        setChapters(
          prev => prev.map((chapter) =>
            chapter.chapterId === chapterId ? {
              ...chapter, collapsed: !chapter.collapsed
            } : chapter
          )
        );
    }
  }

  // Function for adding lecture:
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        prev => prev.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const newContent = chapter.chapterContent.filter((_, idx) => idx !== lectureIndex);
            return { ...chapter, chapterContent: newContent };
          }
          return chapter;
        })
      )
    }
  };

  const addLecture = ()=>{
    setChapters(
      prev => prev.map((chapter)=>{
        if(chapter.chapterId === currentChapterId){
          const newLecture = {
            ...lectureDetails , lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          }
          return { ...chapter, chapterContent: [...chapter.chapterContent, newLecture] }
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree:false
    })
  }

const handleSubmit = async (e)=>{
  e.preventDefault()
}

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }
  }, [])

  return (

    <div className='min-h-screen w-full py-10 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-gray-100'>
      <div className='max-w-4xl mx-auto'>
        <form onSubmit={handleSubmit} className='backdrop-blur-sm bg-white/5 border border-white/6 rounded-2xl p-6 md:p-10 space-y-6 shadow-lg'>

          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-300'>Course Title</p>
            <input
              type="text"
              onChange={e => setCourseTitle(e.target.value)}
              value={courseTitle}
              placeholder='Type here'
              className='outline-none py-3 px-4 rounded-lg border border-white/10 placeholder:text-gray-400 bg-white/3 focus:ring-2 focus:ring-blue-400 transition-all duration-200'
              required
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-sm text-gray-300'>Course Description</p>
            <div ref={editorRef} className='min-h-[120px] rounded-md border border-white/8 bg-white/3 p-2'></div>

            <div className='flex items-center justify-between flex-wrap gap-4'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-gray-300'>Course Price</p>
                <input type="number" onChange={e => setCoursePrice(e.target.value)} value={coursePrice} placeholder='0' className='outline-none py-2 w-28 px-3 rounded-lg border border-white/10 bg-white/3' />
              </div>

              <div className='flex md:flex-row flex-col items-center gap-3'>
                <p className='text-sm text-gray-300'>Course Thumbnail</p>
                <label htmlFor='thumbnail' className='flex items-center gap-3 cursor-pointer select-none'>
                  <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-600 rounded-lg shadow-md' />
                  <input type="file" id='thumbnail' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
                  {image && (
                    <img src={URL.createObjectURL(image)} alt="thumbnail" className='w-20 h-12 object-cover rounded-md border border-white/10 shadow-sm' />
                  )}
                </label>
              </div>

            </div>

          </div>

          <div className='flex flex-col gap-1 w-36'>
            <p className='text-sm text-gray-300'>Discount %</p>
            <input type="number" onChange={e => setDiscount(e.target.value)} value={discount} placeholder='0' min={0} max={100} className='outline-none py-2 px-3 rounded-lg border border-white/10 bg-white/3' />
          </div>

          {/* Chapters list */}
          <div className='space-y-4'>
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.chapterId} className='bg-white/6 border border-white/8 rounded-xl mb-2 overflow-hidden transition-transform duration-300 hover:scale-[1.01]'>
                <div className='flex justify-between items-center p-4 border-b border-white/8'>
                  <div className='flex items-center'>
                    <img
                      onClick={() => handleChapter('toggle', chapter.chapterId)}
                      src={assets.dropdown_icon}
                      width={14}
                      className={`mr-3 cursor-pointer transition-transform duration-300 ${chapter.collapsed ? "-rotate-90" : "rotate-0"}`}
                    />

                    <span className='font-semibold text-white'>{chapterIndex + 1}. {chapter.chapterTitle}</span>

                  </div>
                  <div className='flex items-center gap-4'>
                    <span className='text-sm text-gray-300'>{chapter.chapterContent.length} Lectures</span>
                    <img src={assets.cross_icon} alt="cross_icon" className='cursor-pointer w-5 h-5' onClick={() => handleChapter('remove', chapter.chapterId)} />
                  </div>
                </div>

                {!chapter.collapsed && (
                  <div className='p-4'>
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div key={lecture.lectureId || lectureIndex} className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-gray-200'>{lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' rel='noreferrer' className='text-blue-300 underline'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>
                        <img src={assets.cross_icon} alt="" className='cursor-pointer w-5 h-5' onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} />
                      </div>
                    ))}
                    <div className='inline-flex bg-white/6 p-2 rounded cursor-pointer mt-2 hover:bg-white/8 transition-colors duration-200' onClick={() => handleLecture('add', chapter.chapterId)}>+ Add Lecture</div>
                  </div>
                )}
              </div>
            ))}

            <div className='flex justify-center items-center bg-blue-600 p-2 rounded-lg cursor-pointer text-white font-medium shadow hover:scale-[1.02] transition-transform duration-200' onClick={() => handleChapter('add')}> + Add Chapter </div>
          </div>

          {/* Lecture Popup */}
          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
              <div className='bg-slate-800 text-gray-100 p-6 rounded-xl relative w-full max-w-md border border-white/6 shadow-2xl transform transition-all duration-200'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                <div className='mb-3'>
                  <p className='text-sm text-gray-300'>Lecture Title</p>
                  <input type="text" className='mt-1 block w-full border rounded py-2 px-3 bg-white/3' value={lectureDetails.lectureTitle} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
                </div>

                <div className='mb-3'>
                  <p className='text-sm text-gray-300'>Duration in minutes</p>
                  <input type="number" className='mt-1 block w-full border rounded py-2 px-3 bg-white/3' value={lectureDetails.lectureDuration} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
                </div>

                <div className='mb-3'>
                  <p className='text-sm text-gray-300'>Lecture URL</p>
                  <input type="text" className='mt-1 block w-full border rounded py-2 px-3 bg-white/3' value={lectureDetails.lectureUrl} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
                </div>

                <div className='flex gap-2 my-4 items-center'>
                  <p className='text-sm text-gray-300'>Is Preview Free ?</p>
                  <input type="checkbox" className='scale-125'  checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
                </div>

                <button type='button' onClick={addLecture} className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer'>Add</button>

                <img src={assets.cross_icon} alt="" className='absolute top-4 right-4 w-4 cursor-pointer' onClick={() => setShowPopup(false)} />
              </div>
            </div>
          )}

          <div className='flex justify-end'>
            <button type='submit' className='text-black bg-white w-max py-2.5 px-8 rounded my-4 hover:shadow-md transition-shadow duration-200'>Add</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddCourses

// Quill:
// - Khud ka editor banata hai (DOM ke andar)
// - Khud ka internal data store rakhta hai
// - Khud formatting apply karta hai
// - Khud rerender karta hai apne UI ko
//-  Quill ek Rich Text Editor library hai.
// - Rich Text Editor → jisme aap bold, italic, underline, headings, colors, lists, images sab add kar sakte ho — jaise Google Docs, Medium, Notion jaisa editor.
