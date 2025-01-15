import { useEffect, useState } from "react";
import { fetchServices } from "./Api";
import ReactLoading from "react-loading";
import CreateNote from "./CreateNote";
import Navigation from "../shared/Navigation";
import EditNote from "./EditNote";
import PlusButton from "../shared/PlusButton";

const Notes = ({create, setCreate}) => {

    

    // state for the list of notes
    const [notes, setNotes] = useState([]);
    
    //state for the current note being created or edited
    const [currentNote, setCurrentNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    });

    //note id state to help with seleecting note to edit
    const [noteId, setNoteId] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNoteClick = (note_Id) => {
        
        setNoteId(note_Id)
        setCreate(true)

    }

   

   useEffect(() => {
    const getNotes = async () => {
        
        try {
            setIsLoading(true);
            const data = await fetchServices.fetchNotes();
            
            setNotes(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    getNotes();
   }, [noteId])

    return (
        <section className="w-375 largePhone:w-410 bg-white rounded-t-lg pt-3 px-4 md:w-768  ">
            
            { !create ? <div> <article className="min-h-620 mb-3 "> <h1 className="font-bold text-2xl mb-3 ">All Notes</h1>

            
            <div>
                {notes.length > 0 ? 

                notes.map(note => (
                   
                    
                <div key={note._id} className="border-b border-gray-400 pb-3 my-3">
                    
                    
                    <h2 className="font-semibold text-base mb-3">
                        <button onClick={() => handleNoteClick(note._id)}>{note.title}</button>

                    </h2>
                    {note.tags.length > 0  && <ul className="flex flex-row mb-3">
                        {note.tags.map((tag, i) => (
                        <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1">{tag}</li>
                        ))}
                    </ul>}
                    
                    <p className="text-xs text-gray-700">{new Date(note.lastEdited).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}</p>
                </div>
                ))

                : <p className="bg-gray-200 rounded-lg text-sm py-1 px-3">You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.</p>}
                {isLoading && <div className="block mx-auto  w-20">
                        <ReactLoading 
                            type="bars" 
                            color="blue" 
                            height={50} 
                            width={50} 
                        />
                        </div>}

            </div></article>
                        
            <PlusButton setCreate={setCreate}/>
            <div className="mt-3"></div>

            <Navigation/>
            
            </div> :
            (!noteId ? <CreateNote notes={notes} setNotes={setNotes} currentNote={currentNote} setCurrentNote={setCurrentNote} setCreate={setCreate} onClose={() => setCreate(false)}/> : <EditNote noteId={noteId} setNoteId={setNoteId} onClose={() => setCreate(false)}/>)
            }
        </section>
    )

}

export default Notes;