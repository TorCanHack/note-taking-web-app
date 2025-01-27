import { useState, useEffect } from "react";
import { fetchServices } from "./Api";
import ReactLoading from 'react-loading'
import PlusButton from "../shared/PlusButton";
import Navigation from "../shared/Navigation";
import { useNote } from "../shared/useNote";

const ListOfNotes = ({noteId, setNoteId}) => {

  
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {states} = useNote();
    const {notes, setNotes, setCreate, setMobileCreate} = states;

    const handleNoteClick = (note_Id) => {
        
        setNoteId(note_Id)
        setCreate(true)
        setMobileCreate(true);
        

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
        <section>
            <div className="min-h-screen"> 
                <article className="min-h-620  mb-3"> 
                    <h1 className="font-bold text-2xl mb-3 lg:hidden ">
                        All Notes
                    </h1>

                    {notes.length > 0 ?  notes.map(note => (
   
    
                        <div 
                            key={note._id} 
                            className={`w-full border-b border-gray-400 pb-3 my-3 ${noteId === note._id ? "lg:bg-gray-200  dark:bg-neutral-800" : ""}`}
                        >
    
    
                            <h2 className="font-semibold text-base mb-3">
                                <button onClick={() => handleNoteClick(note._id)}>{note.title}</button>

                    </h2>
                    {note.tags.length > 0  && <ul className="flex flex-row flex-wrap mb-3  w-full -ml-1 ">
                        {note.tags.map((tag, i) => (
                            <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1 mt-1   dark:bg-neutral-600">{tag}</li>
                        ))}
                    </ul>}
    
                    <p className="text-xs text-gray-700 dark:text-white">
                        {new Date(note.lastEdited).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                </div>))

            :<p className="bg-gray-200 rounded-lg text-sm py-1 px-3">
                You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.
            </p>}
            <div>
                
                {isLoading && <div className="block mx-auto  w-20">
                        <ReactLoading 
                            type="bars" 
                            color="blue" 
                            height={50} 
                            width={50} 
                        />
                        </div>}

            </div></article>
                        
            
            

            
            
            </div> 
            <PlusButton/>
            <div className="mt-3"></div>
            <Navigation/>
        </section>
    )

}

export default ListOfNotes;