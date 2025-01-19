import { NoteContext } from "./NoteContext"
import { useState } from "react"
import { fetchServices, postServices } from "../core/Api"

export const NoteProvider = ({children}) => {

    const [note , setNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    })
    const [selectedTag, setSelectedTag] = useState(null)
    const [tagNoteId, setTagNoteId] = useState(null);
    const [showTagNotes, setShowTagNotes] = useState(false)
    const [archivedNoteId, setArchivedNoteId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [archiveModal, setArchiveModal] = useState(false);
    const [freshlyArchived, setFreshlyArchived] = useState(false)
    const [showArchivedNote, setShowArchivedNote] = useState(false)

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
            onClose()
            setNoteId(null)
            
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

    const states = {
        note,
        setNote,
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
        setShowArchivedNote

    }

    const functions = {

        handleArchiveButton,
        handleArchiveCancelButton,
        handleDeleteButton,
        handleDeleteCancelButton,
        activateArchiveModal,
        activateDeleteModal,
        handleBackButton
    }

    return (
        <NoteContext.Provider value={{states, functions}}>
            {children}
        </NoteContext.Provider>
    )
}

