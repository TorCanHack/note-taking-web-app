import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authServices, fetchServices, postServices } from "./Api"
import archive_icon from '../../assets/images/icon-archive.svg'
import delete_icon from '../../assets/images/icon-delete.svg'
import tag_icon from '../../assets/images/icon-tag.svg'


import Navigation from "../shared/Navigation"
import EditArchivedNote from "./EditArchivedNote"
import { ArchiveBtn, ArchiveModal, BackBtn, CancelBtn, DeleteBtn, DeleteModal, LastEdited, NoteInput, Overlay, SaveBtn, TagInput, TitleInput,   } from "../shared/NoteComponents"
import { useNote } from "../shared/useNote"


const EditNote = ({noteId, onClose, setNoteId, source}) => {

    const navigate = useNavigate();
    const {states} = useNote()
    

    
    
    const [archivedNoteId, setArchivedNoteId] = useState(null);
    const {deleteModal, archiveModal, showArchivedNote, note, setNote, setMobileCreate} = states;
    const [error, setError] = useState('')

    

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
            setNoteId(null)
            setMobileCreate(false) 
        } catch (error) {
            setError(error)
        }

    }

    

   

   

    if (showArchivedNote && archivedNoteId) {
        return (
            <EditArchivedNote 
                archivedNoteId={archivedNoteId}
                setArchivedNoteId={setArchivedNoteId}
                freshlyArchived={freshlyArchived}
                setFreshlyArchived={setFreshlyArchived}
            />
        );
    }

    return (
        <form 
            onSubmit={handleFormSubmission}
            id="note"  
        >
            <div className=" min-h-620 md:min-h-1024 lg:min-h-620 lg:max-h-screen lg:p-5 ">
            {(deleteModal || archiveModal) && <Overlay/>}
            <div className='border-b border-black flex flex-row justify-between py-2 lg:hidden '>

                <BackBtn/>
                
            
                <div className='flex justify-between  w-48'>
                   
                    <DeleteBtn/>
                    <ArchiveBtn/>
                    <SaveBtn/>
                    <CancelBtn/>
                    
                </div>
                            
            </div>
                    <div className='border-b border-gray-700 '>
                        <TitleInput 
                            value={note.title} 
                            onChangeFunc={(e) => setNote({...note, title: e.target.value})}
                        />

                        <TagInput   
                            value={note.tags} 
                            onChangeFunc={(e) => setNote({...note, tags: e.target.value.split(",").map(tag => tag.trim())})}
                        />
        
                        <LastEdited lastEditedData={note.lastEdited}/>
        
                    </div>
                   <NoteInput 
                        value={note.content} 
                        onChangeFunc={(e) => setNote({...note, content: e.target.value})}
                    />

                    {deleteModal  && <DeleteModal/>}
                    {archiveModal && <ArchiveModal/>}
                    
                    <div className='hidden lg:flex  pt-2 -mt-1  '>
                        <SaveBtn/>
                        <CancelBtn/>
                    </div>
                    </div>
                    <Navigation/>
        </form>
    )

}

export default EditNote;