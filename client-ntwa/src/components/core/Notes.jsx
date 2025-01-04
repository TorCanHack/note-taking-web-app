import { useState } from "react";
import plus from '../../assets/images/icon-plus.svg'
import CreateNote from "./CreateNote";
import Navigation from "../shared/Navigation";

const Notes = () => {

    //state for create button
    const [create, setCreate] = useState(false);

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

   const handeCreateButton = () => {
    setCreate(true)
   }

    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black min-h-620 md:w-768 md:w-950">
            { !create ? <div> <h1 className="font-bold text-2xl mb-3 ">All Notes</h1>

     
            <div>
                {notes.length > 0 ? 

                notes.map(note => (
                <div key={note.id}>
                    <h2>{note.title}</h2>
                    <ul>
                        {note.tags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                        ))}
                    </ul>
                    <p>{note.createdAt}</p>
                </div>
                ))

                : <p className="bg-gray-200 rounded-lg text-sm py-1 px-3">You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.</p>}

            </div>
            

            

            

            
            <button className="relative top-82 flex flex-col justify-center items-center bg-blue-600 rounded-full h-12 w-12 ml-auto ">
                <img src={plus} alt="cross icon" onClick={handeCreateButton} className="h-9 w-9  "/>
            </button>
            <Navigation/>
            </div> :
            <CreateNote notes={notes} setNotes={setNotes} currentNote={currentNote} setCurrentNote={setCurrentNote} setCreate={setCreate}/>}
        </section>
    )

}

export default Notes;