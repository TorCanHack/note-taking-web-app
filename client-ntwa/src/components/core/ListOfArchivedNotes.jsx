import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { fetchServices } from "./Api";
import { useNote } from '../shared/useNote'

const ListOfArchivedNotes = () => {
    const [archivedNote, setArchivedNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const {states} = useNote()
    const {archivedNoteId, setArchivedNoteId, setShowMobileNotes} = states;

    

    useEffect(() => {
        const getArchivedNotes = async () => {

            try {
                setIsLoading(true)
                const data = await fetchServices.fetchArchivedNotes()
                
                setArchivedNote(data)

            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        getArchivedNotes();
    }, [archivedNoteId])

    const handleArchiveNoteClick = (note_Id) => {
        
        setArchivedNoteId(note_Id)
        setShowMobileNotes(true)
        
        
    }

    return (
        
        <div className="min-h-620 md:min-h-1024 lg:min-h-620  mb-3 dark:text-white">
                <h1 className="font-bold text-2xl mb-3 lg:hidden">Archived Notes</h1>
                <p className="mb-3 lg:text-sm">All your archived notes are stored here. You can restore them or delete them anytime</p>
                {isLoading && <div className="block mx-auto  w-20">
                    <ReactLoading 
                        type="bars" 
                        color="blue" 
                        height={50} 
                        width={50} 
                    />
                </div>}
                {archivedNote.map(note => (
                    <div 
                        key={note._id}
                        className={`border-b border-gray-300 pb-3 my-3  ${note._id === archivedNoteId ? "bg-gray-300 dark:bg-neutral-800" : ""}`}
                    >
                        <h2 className="font-semibold text-base mb-2">
                            <button onClick={() =>handleArchiveNoteClick(note._id)}>
                                {note.title}</button></h2>
                        <ul className="flex flex-row flex-wrap mb-2 -ml-1 ">

                            {note.tags.map((tag, i) => (
                                <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1 mt-1 dark:bg-gray-600">{tag}</li>
                            ))}
                        </ul>
                        <p className="text-xs text-gray-700 mb-2 dark:text-gray-300">{new Date(note.lastEdited).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}</p>
                    </div>
                ))}
            </div>
    )

}

export default ListOfArchivedNotes;