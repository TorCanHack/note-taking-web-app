import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authServices, fetchServices, postServices } from "./Api"
import archive_icon from '../../assets/images/icon-archive.svg'
import delete_icon from '../../assets/images/icon-delete.svg'
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'


const EditNote = ({noteId, onClose, setNoteId, source}) => {
    const navigate = useNavigate();
    

    const [note , setNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    })
    const [error, setError] = useState({})
    const [deleteModal, setDeleteModal] = useState(false);

    

    useEffect(() => {
        const loadNote = async () => {
            try {
                const fetchedNote = await fetchServices.fetchNoteById(noteId);
                setNote(fetchedNote)
            } catch (error) {
                setError(error)
            }
        }

        loadNote();
    }, [noteId])

    const handleFormSubmission = async(e) => {
        e.preventDefault();

        // update lastEdited before saving 
        const updatedNote = {...note, lastEdited: Date.now() }
        try {
            await fetchServices.updateFetchedNote(noteId, updatedNote)
            onClose();
        } catch (error) {
            setError(error)
        }

    }

    const handleBackButton = (e) => {

        e.preventDefault();
        
        
        if (source === "tags") {
            navigate("/tags")
            setNoteId(null)

        } else {
            navigate("/")
            setNoteId(null)
            onClose();
        }


    }

    const activateDeleteModal = (e) => {
        e.preventDefault();
        setDeleteModal(true)
    }

    const handleDeleteButton = async (e) => {
        e.preventDefault()

        try {
            await fetchServices.deleteNote(noteId)
            onClose()
            setNoteId(null)
            
        } catch (error) {
            setError(error)
        }
    }

    const handleArchiveButton = async (e) => {
        e.preventDefault();

        try {
            await postServices.ArchiveNote(noteId, note)
            onClose()
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form onSubmit={handleFormSubmission}>
            <div className='border-b border-black flex flex-row justify-between py-2'>
                <button 
                    className='flex flex-row items-center  w-28 text-sm text-gray-600' 
                    onClick={handleBackButton}
                >
                    <img 
                        src={arrow_left} 
                        alt="arrow icon" 
                        className='w-4 h-4'
                    />
                    Go back
                </button>
            
                <div className='flex justify-between  w-48'>
                   
                    <button onClick={activateDeleteModal}>
                        <img 
                            src={delete_icon} 
                            alt="delete icon" 
                            className="w-4 h-4"
                        />
                    </button>

                    <button onClick={handleArchiveButton}>
                        <img 
                            src={archive_icon} 
                            alt="archive_icon" 
                            className="w-4 h-4"
                        />
                    </button>

                    <button className='text-sm text-gray-600'>Cancel</button>

                    <button 
                        type='submit' 
                        className='text-blue-400 text-sm'
                    >
                        Save Note
                    </button>
                </div>
                            
                </div>
                    <div className='border-b border-gray-700'>
                        <input 
                            type="text" 
                            name="title" value={note.title} 
                            onChange={(e) => setNote({...note, title: e.target.value})} 
                            placeholder="Enter a title.." 
                            className=" text-2xl font-bold placeholder:font-bold placeholder:text-black placeholder:text-xl my-3"
                        />
        
                        <div className='flex flex-row justify-between items-center h-10 mb-3 md:justify-normal '>
                            <div className='flex flex-row w-20 md:w-32 md:mr-2'>
                                <img 
                                    src={tag_icon} 
                                    alt='tag icon' 
                                    className='w-4 h-4 mr-2'
                                />
                                <p className='text-xs'>Tags</p>
        
                            </div>
                            
                            <textarea 
                                type="text" 
                                name="tag" 
                                value={note.tags} 
                                onChange={(e) => setNote({...note, tags: e.target.value.split(",").map(tag => tag.trim())})} placeholder='Add tags seprated by commas (e.g. Work, Planing)' 
                                className='inline-block placeholder:text-xs h-8 resize-none'
                            />
                        </div>  
        
                        <div className='flex flex-row  items-center mb-3'>
                            <div className='flex flex-row  w-32 mr-2'>
                                <img 
                                    src={clock_icon} 
                                    alt='clock icon' 
                                    className='w-4 h-4 mr-2'
                                /> 
                                <h3 className='text-xs'>Last edited</h3>
        
                            </div>
        
                            <p className='text-xs text-gray-600'>
                                {new Date(note.lastEdited).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                     year: 'numeric'
                                })}
                            </p>
        
                            
                        </div> 
        
                    </div>
                    <textarea 
                        name='content' 
                        value={note.content} 
                        onChange={(e) => setNote({...note, content: e.target.value})} 
                        placeholder='Start your typing here...' 
                        className="text-sm resize-none h-511 w-full placeholder:text-xs placeholder:text-black mt-3"
                    />

                    {deleteModal && (<div className="relative bottom-97 w-343 h-48 p-4 rounded-lg border border-black z-30">
                        <div className="flex flex-row justify-between items-center border-b border-black">
                            <div className="flex flex-col justify-center items-center bg-gray-200 h-10 w-10 rounded-xl">
                                <img
                                    src={delete_icon}
                                    alt="delete icon"
                                
                                />
                            </div>
                            <div className="flex flex-col w-247 mb-4">
                                <h3 className="text-base font-bold mb-1">Delete</h3>
                                <p className="text-sm">Are you sure you want to permanetly delete this note? This act cannot be undone</p>

                            </div>

                        </div>
                        <div className="flex flex-row justify-end  pt-4">
                            <button className="h-10 w-24 bg-gray-200 rounded-xl">Cancel</button>
                            <button 
                                onClick={handleDeleteButton}
                                className="h-10 w-28 bg-red-600 rounded-xl ml-3"
                            >
                                Delete
                            </button>
                        </div>
                       
                        

                    </div>)}
        </form>
    )

}

export default EditNote;