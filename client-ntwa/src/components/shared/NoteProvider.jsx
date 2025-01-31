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

    const [mobileCreate, setMobileCreate] = useState(false);
    const [notes, setNotes] = useState([]);
    const [searchNotes, setSearchNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [tagNotes, setTagNotes] = useState([]);
    const [error, setError] = useState('')
    const [noteId, setNoteId] = useState(null)
    const [searchNoteId, setSearchNoteId] = useState(null) 
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
    const [searchInput, setSearchInput] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [showMobileNotes, setShowMobileNotes] = useState(false);
    const [source, setSource] = useState(null)

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
           
            if (noteId) {
                await fetchServices.deleteNote(noteId) 
            } else if (archivedNoteId) {
                await fetchServices.deleteArchiveNote(archivedNoteId) 
            }

            setNoteId(null)
            setArchivedNoteId(null)
            setTagNoteId(null)
            setDeleteModal(false)
            setShowAllNotes(true)
            setMobileCreate(false)

            
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
        setMobileCreate(false)
        setTagNoteId(null)
        
    }

    const handleBackButton = (e) => {

        e.preventDefault();
        
        setShowMobileNotes(false)
        setTagNoteId(null)
        setCreate(false)
        setMobileCreate(false)
        setNoteId(null)
        


    }

    const handleRestoreButton = async (e) => {
        e.preventDefault();
    
        try {
            const restoredNote = await postServices.RestoreNote(archivedNoteId, archivedNote)
            /*navigate("/archive")**/
            setNoteId(restoredNote._id)
            setArchivedNoteId(null)
            setShowMobileNotes(false)
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

     //debounce function to prevent too many api calls
     const debounce = (func, delay) => {
        let timeoutId;
        return(...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(null, args)
            }, delay)
        }
    }

    const getSearchNotes = async (searchItem) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchServices.searchNotes(searchItem);
            console.log("fetched data: ", data)
            setSearchNotes(data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const debouncedGetNotes = debounce(getSearchNotes, 300)

    const handleSearchInput = (e) => {
        const {value} = e.target
        setSearchInput(value)
        debouncedGetNotes(value)
        setSelectedTag(null)
        

    }

    const handleSearchClick = async (note_id) => {
        setSearchNoteId(note_id);
        
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
        setNotes,
        searchInput, 
        setSearchInput,
        searchNotes, 
        setSearchNotes,
        searchNoteId, 
        setSearchNoteId,
        showSettings, 
        setShowSettings,
        isModalOpen, 
        setIsModalOpen,
        isThemeModalOpen, 
        setIsThemeModalOpen,
        isFontModalOpen, 
        setIsFontModalOpen,
        isPasswordModalOpen, 
        setIsPasswordModalOpen,
        showMobileNotes, 
        setShowMobileNotes,
        source, 
        setSource,
        mobileCreate, 
        setMobileCreate

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
        getNotesByTag,
        handleSearchInput,
        handleSearchClick
    }

    return (
        <NoteContext.Provider value={{states, functions}}>
            {children}
        </NoteContext.Provider>
    )
}

