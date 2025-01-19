import { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import { Button1 } from "../shared/Button";
import home_icon from '../../assets/images/icon-home.svg'
import home_icon_copy from '../../assets/images/icon-home copy.svg'
import chevron_right from '../../assets/images/icon-chevron-right.svg'
import ListOfNotes from "./ListOfNotes";
import archive_icon from '../../assets/images/icon-archive.svg'
import archive_icon_copy from '../../assets/images/icon-archive copy.svg'
import logo from '../../assets/images/logo.svg'
import plus from '../../assets/images/icon-plus.svg'
import ListOfTags from "./ListOfTags";
import SelectedTagList from "./SelectedTagList";
import { useNote } from "../shared/useNote";
import ListOfArchivedNotes from "./ListOfArchivedNotes";
import EditArchivedNote from "./EditArchivedNote";


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
    const [showAllNotes, setShowAllNotes] = useState(false);
    const [showAllArchived, setShowAllArchived] = useState(false);
    const {states} = useNote();
    const {selectedTag, setSelectedTag, tagNoteId, setTagNoteId, archivedNoteId} = states;
    

    const handleNotesDisplay = () => {
        setShowAllNotes(true)
        setShowAllArchived(false)
        setSelectedTag(null)
    }

    const handleArchiveNotesDisplay = () => {
        setShowAllArchived(true)
        setShowAllNotes(false)
        setSelectedTag(null)
    }

    const handleCreateButton = () => {
        setCreate(true);
    }

    useEffect(() => {
        handleNotesDisplay()
    }, [])
    
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

        <div className="hidden lg:flex lg:flex-col ">
            <header className="h-14 flex justify-between items-center px-4 border-b border-gray-200">
                <div className="flex flex-col justify-center items-center border border-black  w-64 h-20">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="lg:mr-44 lg:border-r "    
                    />

                </div>
                
                <h1 className="text-2xl font-bold lg:mr-auto">
                    {showAllNotes ? "All Notes" : showAllArchived ? "Archived" : selectedTag ? <span className="text-gray-400">Notes Tagged: <span className="text-black">{selectedTag}</span></span> : "" }
                </h1>

            </header>
        <section className="hidden lg:flex lg:flex-row lg:bg-white lg:w-1440">
            
            <section className="lg:w-272 lg:h-screen lg:mr-auto lg:border-r lg:border-black lg:px-2 ">
                <Button1
                    image={showAllNotes ? 
                        <img 
                            src={home_icon_copy} 
                            alt="home icon"
                            className="h-5 w-5 mr-2"
                        /> 
                        :
                        <img 
                        src={home_icon} 
                        alt="home_icon" 
                        className="h-5 w-5 mr-2"
                        
                    />}
                    text='All Notes'
                    image2={<img 
                        src={chevron_right} 
                        alt="chevron icon" 
                        className={`${showAllNotes? "flex ml-auto" : "hidden"}`}
                    />}
                    className={`${showAllNotes ? "bg-gray-200 rounded-xl" : ""} mt-4`}
                    buttonFunc={handleNotesDisplay}
                    
                />
                <Button1
                    image={showAllArchived ? 
                        <img 
                        src={archive_icon_copy} 
                        alt="archive icon"
                        className="h-5 w-5 mr-2"
                    />
                    :
                    <img 
                        src={archive_icon} 
                        alt="archive icon" 
                        className="h-5 w-5 mr-2"/>}
                    text='Archive'
                    image2={<img src={chevron_right} alt="chevron icon" className={`${showAllArchived? "flex ml-auto" : "hidden"}`}/>}
                    className={`${showAllArchived ? "bg-gray-200 rounded-xl" : ""} `}
                    
                    buttonFunc={handleArchiveNotesDisplay}
                    
                />
                
                <ListOfTags/>

            </section>

            <section className=" lg:min-h-full lg:max-h-screen lg:overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-100 scrollbar-rounded-lg lg:w-295">
                {(showAllNotes && !selectedTag) && <div className=" lg:p-5 border-r border-black">
                    <Button1
                        image={<img src={plus} alt="plus logo"/>}
                        text="Create Note"
                        className="bg-blue-700 text-white rounded-xl mb-3"
                        buttonFunc={handleCreateButton}
                    />
                        
                    <ListOfNotes 
                        notes={notes}
                        setNotes={setNotes}
                        noteId={noteId}
                        setNoteId={setNoteId}
                        setCreate={setCreate}
                    />

                </div>}
                {(showAllArchived && !selectedTag) && <div className="lg:w-295 box-border border  border-black lg:p-5">
                    <Button1
                        image={<img src={plus} alt="plus logo"/>}
                        text="Create Note"
                        className="bg-blue-700 text-white rounded-xl mb-3"
                        buttonFunc={handleCreateButton}
                    />
                    <ListOfArchivedNotes/>
                </div>}

                {selectedTag && <div>
                    <SelectedTagList/>
                    

                </div>}
                

            </section>
            <section className="lg:h-screen lg:w-590  ">
                { create && !noteId ? <CreateNote 
                    notes={notes} 
                    setNotes={setNotes} 
                    currentNote={currentNote} 
                    setCurrentNote={setCurrentNote} 
                    setCreate={setCreate} onClose={() => setCreate(false)}
                /> 
                : noteId && showAllNotes ?  <EditNote noteId={noteId} setNoteId={setNoteId}/>

                : archivedNoteId && showAllArchived ?  <EditArchivedNote/> : tagNoteId ? <EditNote noteId={tagNoteId} setNoteId={setTagNoteId}/> : null }
                

            </section>

            <section className="lg:w-272 lg:h-screen border border-black">
                <p>juj</p>

            </section>

        </section>
        </div>
        </>
    )

}

export default Notes;