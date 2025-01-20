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
import { ArchiveBtn, ArchiveModal, DeleteBtn } from "../shared/NoteComponents";


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
    
    const [showAllArchived, setShowAllArchived] = useState(false);
    const {states} = useNote();
    const {selectedTag, setSelectedTag, tagNoteId, setTagNoteId, archivedNoteId, noteId, setNoteId,showAllNotes, setShowAllNotes } = states;
    

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
        setCreate(false)
    }, [notes])
    
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

        <div className="hidden lg:flex lg:flex-row w-screen px-6">

            <section className="lg:w-1/4 lg:min-h-screen flex flex-col lg:mr-auto lg:border-r lg:border-gray-200 lg:px-2 ">
                <div className="flex flex-col justify-center items-start h-20">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className=" "    
                    />

                </div>

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
                    className={`${showAllNotes ? "bg-gray-200 rounded-xl" : ""} mt-4 w-full`}
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
                    className={`${showAllArchived ? "bg-gray-200 rounded-xl " : ""}  mt-2 w-full`}
                    
                    buttonFunc={handleArchiveNotesDisplay}
                    
                />
                
                <ListOfTags/>

            </section>

            <section className="hidden lg:flex lg:flex-col lg:bg-white w-full ">

                <header className="h-16 flex justify-between items-center px-4 border-b border-gray-200 w-full ">
                
                
                    <h1 className="text-2xl font-bold lg:mr-auto">
                        {showAllNotes ? "All Notes" : 
                        showAllArchived ? "Archived" : 
                        selectedTag ? 
                            <span className="text-gray-400">
                                Notes Tagged: 
                                <span className="text-black">
                                    {selectedTag}
                                </span>
                            </span> :
                         "" }
                    </h1>

                </header>

                <div className="flex flex-row ">

                    <section className=" lg:min-h-full lg:max-h-screen lg:overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-100 scrollbar-rounded-lg lg:w-1/4">
           
                        {(showAllNotes && !selectedTag) && <div className=" lg:p-5 border-r border-black">
                            <Button1
                                image={<img src={plus} alt="plus logo"/>}
                                text="Create Note"
                                className="bg-blue-700 text-white rounded-xl mb-3 w-full"
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

                    <section className="lg:h-screen lg:w-1/2  ">
                        { create && !noteId ? 
                            <CreateNote 
                                notes={notes} 
                                setNotes={setNotes} 
                                currentNote={currentNote} 
                                setCurrentNote={setCurrentNote} 
                                setCreate={setCreate} onClose={() => setCreate(false)}
                            /> 
                        : noteId && showAllNotes ?  
                            <EditNote 
                                noteId={noteId} 
                                setNoteId={setNoteId}
                            />

                        : archivedNoteId && showAllArchived ?  
                            <EditArchivedNote/> 
                        : tagNoteId ? 
                            <EditNote 
                                noteId={tagNoteId} 
                                setNoteId={setTagNoteId}
                            /> 
                        : null }
                

                    </section>

                    <section className=" flex flex-col items-center lg:w-1/4 lg:h-screen border border-black pt-4 ">
                        {showAllNotes && (<div>

                            <ArchiveBtn/>
                            <DeleteBtn/>

                        </div>)}

                

                    </section>
                </div>

        </section>
        </div>
        </>
    )

}

export default Notes;