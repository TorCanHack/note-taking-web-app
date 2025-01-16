import { useState } from "react";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import { Button1 } from "../shared/Button";
import home_icon from '../../assets/images/icon-home.svg'
import chevron_right from '../../assets/images/icon-chevron-right.svg'
import ListOfNotes from "../shared/ListOfNotes";
import Tags from "./Tags";
import archive_icon from '../../assets/images/icon-archive.svg'

const Notes = ({create, setCreate}) => {

       //state for the current note being created or edited
       const [currentNote, setCurrentNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    });

    // state for the list of notes
    const [notes, setNotes] = useState([]);
    
   

    //note id state to help with seleecting note to edit
    const [noteId, setNoteId] = useState(null);
    

    
    return (
        <>
        <section className="w-375 largePhone:w-410 bg-white rounded-t-lg pt-3 px-4 md:w-768 lg:hidden  ">
            

            {!create ?
            <ListOfNotes
                notes={notes}
                setNotes={setNotes}
                noteId={noteId}
                setNoteId={setNoteId}
                setCreate={setCreate}
            />
            :
            (!noteId ? 
                <CreateNote 
                    notes={notes} 
                    setNotes={setNotes} 
                    currentNote={currentNote} 
                    setCurrentNote={setCurrentNote} 
                    setCreate={setCreate} onClose={() => setCreate(false)}
                /> 
                : <EditNote 
                    noteId={noteId} 
                    setNoteId={setNoteId} 
                    onClose={() => setCreate(false)}
                />
            )
            }
        </section>

        <section className="hidden lg:flex lg:flex-row lg:bg-white">
            <section className="lg:w-272 lg:h-screen lg:mr-auto lg:border lg:border-black lg:px-2 ">
                <Button1
                    image={<img 
                        src={home_icon} 
                        alt="home_icon" 
                        className="h-5 w-5 mr-2"
                    />}
                    text='All Notes'
                    image2={<img 
                        src={chevron_right} 
                        alt="chevron icon" 
                        className="hidden active:flex"
                    />}
                    className="border border-black"
                    
                />
                <Button1
                    image={<img 
                        src={archive_icon} 
                        alt="archive icon" 
                        className="h-5 w-5 mr-2"/>}
                    text='Archive'
                    image2={<img src={chevron_right} alt="chevron icon" className="hidden active:flex"/>}
                    className=""
                    
                />
                
                <Tags/>

            </section>

        </section>
        </>
    )

}

export default Notes;