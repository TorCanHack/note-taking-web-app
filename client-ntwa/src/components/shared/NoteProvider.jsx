import { NoteContext } from "./NoteContext"
import { useState } from "react"

export const NoteProvider = ({children}) => {

    const [selectedTag, setSelectedTag] = useState(null)
    const [tagNoteId, setTagNoteId] = useState(null);
    const [showTagNotes, setShowTagNotes] = useState(false)
    const [archivedNoteId, setArchivedNoteId] = useState(null);

    return (
        <NoteContext.Provider value={{selectedTag, setSelectedTag, tagNoteId, setTagNoteId, showTagNotes, setShowTagNotes, archivedNoteId, setArchivedNoteId}}>
            {children}
        </NoteContext.Provider>
    )
}

