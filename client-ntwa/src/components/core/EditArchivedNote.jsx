
import delete_icon from '../../assets/images/icon-delete.svg'
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import { useState, useEffect } from 'react'
import { fetchServices, postServices } from './Api'
import { Navigate, useNavigate } from 'react-router-dom'
import Navigation from '../shared/Navigation'
import { useNote } from '../shared/useNote'
import { BackBtn, CancelBtn, DeleteBtn, LastEdited, NoteInput, RestoreBtn, SaveBtn, TagInput, TitleInput } from '../shared/NoteComponents'


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
    
 
    
   
    
    

    return(
        <form onSubmit={handleFormSubmission} className='p-4'>
            <div className='min-h-620 md:min-h-1024 lg:min-h-620 lg:max-h-screen lg:p-5'>

            <div className='border-b border-black flex flex-row justify-between py-2 lg:hidden'>
                <BackBtn/>
                    
                <div className='flex justify-between  w-48'>
                           
                    <DeleteBtn/>
                    <RestoreBtn/>
                    <CancelBtn/>
                    <SaveBtn/>
                    
                </div>
                                    
            </div>
            <div className='border-b border-gray-700'>
                <TitleInput 
                    value={archivedNote.title} 
                    onChangeFunc={(e) => setArchivedNote({...archivedNote, title: e.target.value})}
                />
                
                <TagInput 
                    value={archivedNote.tags} 
                    onChangeFunc={(e) => setArchivedNote({...archivedNote, tags: e.target.value.split(",").map(tag => tag.trim())})} 
                /> 
                
                <LastEdited lastEditedData={archivedNote.lastEdited}/>
                
            </div>

            <NoteInput 
                value={archivedNote.content} 
                onChangeFunc={(e) => setArchivedNote({...archivedNote, content: e.target.value})}
            />

            <div className='hidden lg:flex  pt-2 -mt-1  '>
                <SaveBtn/>
                <CancelBtn/>
            </div>
                    

            {freshlyArchived && <p>Note Archived</p>}
            </div>
            <Navigation/>
        </form>
    )

}

export default EditArchivedNote;