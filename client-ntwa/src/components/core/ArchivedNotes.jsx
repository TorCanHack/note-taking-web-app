import { useEffect, useMemo, useState } from "react";
import { fetchServices } from "./Api";
import Navigation from "../shared/Navigation";
import PlusButton from "../shared/PlusButton";
import EditArchivedNote from "./EditArchivedNote";

const ArchivedNotes = ( {setCreate} ) => {

    

    const [archivedNote, setArchivedNote] = useState([])
    const [archivedNoteId, setArchivedNoteId] = useState(null);
    
    
    const [error, setError] = useState('')

    useEffect(() => {
        const getArchivedNotes = async () => {

            try {
                const data = await fetchServices.fetchArchivedNotes()
                console.log("Fetched notes:", data); 

                
                setArchivedNote(data)

            } catch (error) {
                setError(error)
            }
        }

        getArchivedNotes();
    }, [archivedNoteId])

    const handleArchiveNoteClick = (note_Id) => {
        
        setArchivedNoteId(note_Id)
        

    }

    return(
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950">
            {!archivedNoteId ? <div>
            <div className="min-h-620">
                <h1 className="font-bold text-2xl mb-3 ">Archived Notes</h1>
                <p className="mb-3">All your archived notes are stored here. You can restore them or delete them anytime</p>
                {archivedNote.map(note => (
                    <div 
                        key={note._id}
                        className="border-b border-gray-300 pb-3 my-3"
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
            <PlusButton setCreate={setCreate}/>
            </div> 
            : <EditArchivedNote archivedNoteId={archivedNoteId} setArchivedNoteId={setArchivedNoteId} />}

            <Navigation/>
        </section>
    )

}

export default ArchivedNotes;