import restore_icon from '../../assets/images/icon-restore.svg'
import delete_icon from '../../assets/images/icon-delete.svg'
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import { useState, useEffect } from 'react'
import { fetchServices, postServices } from './Api'
import { Navigate, useNavigate } from 'react-router-dom'
import Navigation from '../shared/Navigation'
import { useNote } from '../shared/useNote'


const EditArchivedNote = ({ freshlyArchived, setFreshlyArchived }) => {

    const navigate = useNavigate()

    

    const [archivedNote , setArchivedNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()
    
    })

    const [error, setError] = useState({})
    const {states} = useNote()
    const { archivedNoteId, setArchivedNoteId} = states;
    
    useEffect(() => {
        const loadNote = async () => {
            try {
                const fetchedNote = await fetchServices.fetchArchivedNoteById(archivedNoteId);
                setArchivedNote(fetchedNote)
            } catch (error) {
                setError(error)
            }
        }
    
        loadNote();
    }, [archivedNoteId])
    
    const handleFormSubmission = async(e) => {
        e.preventDefault();
    
        // update lastEdited before saving 
        const updatedNote = {...archivedNote, lastEdited: Date.now() }
        try {
            await fetchServices.updateFetchedArchivedNote(archivedNoteId, updatedNote)
            setArchivedNoteId(null)
            
                
        } catch (error) {
            setError(error)
        }
    
    }
    
    const handleBackButton = (e) => {
    
        e.preventDefault();
        navigate("/archive")  
        setArchivedNoteId(null)
    
    
    
    }
    
    const handleDeleteButton = async (e) => {
        e.preventDefault()
    
        try {
            await fetchServices.deleteNote(archivedNoteId)
            
        } catch (error) {
            setError(error)
        }
    }
    
    const handleRestoreButton = async (e) => {
        e.preventDefault();
    
        try {
            await postServices.RestoreNote(archivedNoteId, archivedNote)
            navigate("/archive")
            setArchivedNoteId(null)
        } catch (error) {
            setError(error)
        }
    }

    return(
        <form onSubmit={handleFormSubmission} className='p-4'>
            <div className='min-h-620 md:min-h-1024'>
            <div className='border-b border-black flex flex-row justify-between py-2 lg:hidden'>
                <button className='flex flex-row items-center  w-28 text-sm text-gray-600' onClick={handleBackButton}>
                    <img src={arrow_left} alt="arrow icon" className='w-4 h-4'/>
                    Go back
                </button>
                    
                <div className='flex justify-between  w-48'>
                           
                    <button onClick={handleDeleteButton}>
                        <img src={delete_icon} alt="delete icon" className="w-4 h-4"/>
                    </button>
        
                    <button onClick={handleRestoreButton}>
                        <img src={restore_icon} alt="archive_icon" className="w-4 h-4"/>
                    </button>
        
                    <button className='text-sm text-gray-600'>Cancel</button>
                    <button type='submit' className='text-blue-400 text-sm'>Save Note</button>
                </div>
                                    
            </div>
            <div className='border-b border-gray-700'>
                <input type="text" name="title" value={archivedNote.title} onChange={(e) => setArchivedNote({...archivedNote, title: e.target.value})} placeholder="Enter a title.." className=" text-2xl font-bold placeholder:font-bold placeholder:text-black placeholder:text-xl my-3"/>
                
                <div className='flex flex-row justify-between items-center h-10 mb-3 md:justify-normal '>
                    <div className='flex flex-row w-20 md:w-32 md:mr-2'>
                        <img src={tag_icon} alt='tag icon' className='w-4 h-4 mr-2'/>
                        <p className='text-xs'>Tags</p>
                    </div>
                                    
                    <textarea type="text" name="tag" value={archivedNote.tags} onChange={(e) => setArchivedNote({...archivedNote, tags: e.target.value.split(",").map(tag => tag.trim())})} placeholder='Add tags seprated by commas (e.g. Work, Planing)' className='inline-block placeholder:text-xs h-8 resize-none'/>
                </div>  
                
                <div className='flex flex-row  items-center mb-3'>
                    <div className='flex flex-row  w-32 mr-2'>
                        <img src={clock_icon} alt='clock icon' className='w-4 h-4 mr-2'/> 
                        <h3 className='text-xs'>Last edited</h3>
                
                    </div>
                
                    <p className='text-xs text-gray-600'>
                        {new Date(archivedNote.lastEdited).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                
                                    
                </div> 
                
            </div>
            <textarea name='content' value={archivedNote.content} onChange={(e) => setArchivedNote({...archivedNote, content: e.target.value})} placeholder='Start your typing here...' className="text-sm resize-none h-511 w-full placeholder:text-xs placeholder:text-black mt-3"></textarea>

            {freshlyArchived && <p>Note Archived</p>}
            </div>
            <Navigation/>
        </form>
    )

}

export default EditArchivedNote;