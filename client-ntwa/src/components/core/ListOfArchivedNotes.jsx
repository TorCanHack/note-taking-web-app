import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { fetchServices } from "./Api";
import { useNote } from '../shared/useNote'

const ListOfArchivedNotes = () => {
    const [archivedNote, setArchivedNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const {states} = useNote()
    const {archivedNoteId, setArchivedNoteId} = states;

    

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
        

        

    }

    return (
        
        <div className="min-h-620 md:min-h-1024  mb-3  ">
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
                        className={`border-b border-gray-300 pb-3 my-3  ${note._id === archivedNoteId ? "bg-gray-300" : ""}`}
                    >
                        <h2 className="font-semibold text-base mb-2">
                            <button onClick={() =>handleArchiveNoteClick(note._id)}>
                                {note.title}</button></h2>
                        <ul className="flex flex-row mb-2">

                            {note.tags.map((tag, i) => (
                                <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1">{tag}</li>
                            ))}
                        </ul>
                        <p className="text-xs text-gray-700 mb-2">{new Date(note.lastEdited).toLocaleDateString('en-GB', {
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