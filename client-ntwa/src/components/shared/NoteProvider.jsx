import { NoteContext } from "./NoteContext"
import { useState } from "react"
import { fetchServices, postServices } from "../core/Api"
import { useNavigate } from "react-router-dom"



export const NoteProvider = ({children}) => {

    const navigate = useNavigate()

    const [note , setNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    })

    const [archivedNote , setArchivedNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()
        
    })

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [tagNotes, setTagNotes] = useState([]);
    const [error, setError] = useState('')
    const [noteId, setNoteId] = useState(null)
    const [selectedTag, setSelectedTag] = useState(null)
    const [tagNoteId, setTagNoteId] = useState(null);
    const [showTagNotes, setShowTagNotes] = useState(false)
    const [archivedNoteId, setArchivedNoteId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [archiveModal, setArchiveModal] = useState(false);
    const [freshlyArchived, setFreshlyArchived] = useState(false)
    const [showArchivedNote, setShowArchivedNote] = useState(false)
    const [showAllNotes, setShowAllNotes] = useState(false);
    const [showAllArchived, setShowAllArchived] = useState(false);
    const [create, setCreate] = useState(false) 

    const activateDeleteModal = (e) => {
        e.preventDefault();
        setDeleteModal(true)
    }

    const handleDeleteCancelButton = (e) => {
        e.preventDefault();
        setDeleteModal(false)
    }

    const activateArchiveModal = (e) => {
        e.preventDefault();
        setArchiveModal(true)
    }

    const handleArchiveCancelButton = (e) => {
        e.preventDefault();
        setArchiveModal(false)
    }

    const handleDeleteButton = async (e) => {
        e.preventDefault()

        try {
            await fetchServices.deleteNote(noteId)
            setNoteId(null)
            setDeleteModal(false)
            setShowAllNotes(true)
            
        } catch (error) {
            setError(error)
        }
    }

    const handleArchiveButton = async (e) => {
        e.preventDefault();

        try {
            const archivedNote = await postServices.ArchiveNote(noteId, note)
            setArchivedNoteId(archivedNote._id)
            setShowArchivedNote(true)
            setFreshlyArchived(true)
            setArchiveModal(false)
            setNoteId(null)
            setShowAllArchived(true)
            
            
            
        } catch (error) {
            setError(error)
        } 
    }

    const handleCancelButton = (e) => {
        e.preventDefault()
        setArchivedNoteId(null)
        setNoteId(null)
        setCreate(false)
        setTagNoteId(null)
        
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

    const handleRestoreButton = async (e) => {
        e.preventDefault();
    
        try {
            const restoredNote = await postServices.RestoreNote(archivedNoteId, archivedNote)
            /*navigate("/archive")**/
            setNoteId(restoredNote._id)
            setArchivedNoteId(null)
            setShowAllNotes(true)
            setShowAllArchived(false)
        } catch (error) {
            setError(error)
        }
    }

    const getNotesByTag = async (tag) => {
    
        try {
            setIsLoading(true)
            const data = await fetchServices.searchTags(tag)
            setTagNotes(data)
            
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    
    }

    const states = {
        note,
        setNote,
        noteId,
        setNoteId,
        selectedTag, 
        setSelectedTag, 
        tagNoteId, 
        setTagNoteId, 
        showTagNotes, 
        setShowTagNotes, 
        archivedNoteId, 
        setArchivedNoteId,
        archiveModal,
        setArchiveModal,
        deleteModal,
        setDeleteModal,
        freshlyArchived,
        setFreshlyArchived,
        showArchivedNote,
        setShowArchivedNote,
        error,
        setError,
        showAllNotes, 
        setShowAllNotes,
        showAllArchived, 
        setShowAllArchived,
        tagNotes, 
        setTagNotes,
        isLoading, 
        setIsLoading,
        archivedNote , 
        setArchivedNote,
        create, 
        setCreate,
        notes, 
        setNotes

    }

    const functions = {

        handleArchiveButton,
        handleArchiveCancelButton,
        handleDeleteButton,
        handleDeleteCancelButton,
        activateArchiveModal,
        activateDeleteModal,
        handleBackButton,
        handleRestoreButton,
        handleCancelButton,
        getNotesByTag
    }

    return (
        <NoteContext.Provider value={{states, functions}}>
            {children}
        </NoteContext.Provider>
    )
}

