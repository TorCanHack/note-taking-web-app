import { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import { Button1 } from "../shared/Button";
import home_icon from '../../assets/images/icon-home.svg'
import home_icon_copy from '../../assets/images/icon-home copy.svg'
import chevron_right from '../../assets/images/icon-chevron-right.svg'
import chevron_right_dark from '../../assets/images/icon-chevron-right dark.svg'
import ListOfNotes from "./ListOfNotes";
import archive_icon from '../../assets/images/icon-archive.svg'
import archive_icon_copy from '../../assets/images/icon-archive copy.svg'
import logo from '../../assets/images/logo.svg'
import logo_dark from '../../assets/images/logo dark.svg'
import plus from '../../assets/images/icon-plus.svg'
import ListOfTags from "./ListOfTags";
import SelectedTagList from "./SelectedTagList";
import { useNote } from "../shared/useNote";
import ListOfArchivedNotes from "./ListOfArchivedNotes";
import EditArchivedNote from "./EditArchivedNote";
import { ArchiveBtn, ArchiveModal, DeleteBtn, RestoreBtn, SearchBar } from "../shared/NoteComponents";
import SearchList from "./SearchList";
import settings_icon from '../../assets/images/icon-settings.svg';
import SettingsOptions from "./SettingsOptions";
import ColorTheme from "./ColorTheme";
import FontTheme from "./FontTheme";
import ChangePassword from "../auth/ChangePassword";
import { useTheme } from "../shared/useTheme";


const Notes = () => {

       //state for the current note being created or edited
       const [currentNote, setCurrentNote] = useState({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        lastEdited: Date.now()

    });

    // state for the list of notes
    
    
    //note id state to help with seleecting note to edit
    
    const {theme} = useTheme();
    const {states} = useNote();
    const {selectedTag, setSelectedTag, tagNoteId, setTagNoteId, archivedNoteId, noteId, setNoteId,showAllNotes, setShowAllNotes, showAllArchived, setShowAllArchived, create, setCreate, notes, setNotes, searchInput, searchNoteId, setSearchNoteId, showSettings, setShowSettings,     isThemeModalOpen,         isFontModalOpen, isPasswordModalOpen, mobileCreate } = states;
    

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

    const handleShowSettings = () => {
        setShowSettings(true);
        setShowAllNotes(false);

    }

    useEffect(() => {

        if(showAllArchived === true) {
            setShowAllNotes(false)
        } else {
        handleNotesDisplay()
        setCreate(false)}
    }, [notes, noteId])

    
    
    return (
        <>
        <section className="w-375 largePhone:w-410 min-h-screen bg-white rounded-t-lg pt-3 px-4 md:w-768 lg:hidden dark:bg-neutral-950 dark:text-white   ">
            

            {!mobileCreate ?
            <ListOfNotes
                noteId={noteId}
                setNoteId={setNoteId}
                
            />
            :
            (!noteId ? 
                <CreateNote 
                    currentNote={currentNote} 
                    setCurrentNote={setCurrentNote} 
                    
                /> 
                : <EditNote 
                    noteId={noteId} 
                    setNoteId={setNoteId} 
                    
                />
            )
            }
        </section>

        <div className="hidden lg:flex lg:flex-row w-screen px-6 dark:text-white ">

            <section className="lg:w-1/4 lg:min-h-screen lg:max-h-screen flex flex-col lg:mr-auto lg:border-r lg:border-gray-200 lg:px-2 ">
                <div className="flex flex-col justify-center items-start h-20">
                    
                     {theme === 'light' ?
                        <img 
                            src={logo} 
                            alt='logo' 
                            className='h-8 ' 
                                  
                        />
                        :
                        <img 
                            src={logo_dark} 
                            alt='logo' 
                            className='h-8 cur ' 
                        />}

                </div>

                <Button1
                    image={(showAllNotes && !selectedTag) ? 
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
                    image2={theme === 'light' ?
                    <img 
                        src={chevron_right} 
                        alt="chevron icon" 
                        className={`${(showAllNotes && !selectedTag) ? "flex ml-auto" : "hidden"}`}
                    />
                    :
                    <img 
                        src={chevron_right_dark} 
                        alt="chevron icon" 
                        className={`${(showAllNotes && !selectedTag) ? "flex ml-auto" : "hidden"}`}
                    />
                   }
                    className={`${(showAllNotes && !selectedTag) ? "bg-gray-200 rounded-xl dark:bg-neutral-800" : ""} mt-4 w-full`}
                    buttonFunc={handleNotesDisplay}
                    
                />
                <Button1
                    image={(showAllArchived && !selectedTag) ? 
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
                    image2={theme === 'light' ? <img src={chevron_right} alt="chevron icon" className={`${(showAllArchived && !selectedTag) ? "flex ml-auto" : "hidden"}`}/> : <img src={chevron_right_dark} alt="chevron icon" className={`${(showAllArchived && !selectedTag) ? "flex ml-auto" : "hidden"}`}/>  }
                    className={`${(showAllArchived && !selectedTag) ? "bg-gray-200 rounded-xl dark:bg-neutral-800 " : ""}  mt-2 w-full`}
                    
                    buttonFunc={handleArchiveNotesDisplay}
                    
                />
                <div className="lg:min-h-full lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-lg">
                    <ListOfTags/>

                </div>
                

            </section>

            <section className="hidden lg:flex lg:flex-col  w-full ">

                <header className="h-16 flex justify-between items-center px-4 border-b border-gray-200 w-full ">
                
                
                    <h1 className="text-2xl font-bold lg:mr-auto">
                        {(showAllNotes && !selectedTag) ? "All Notes" : 
                        (showAllArchived && !selectedTag) ? "Archived" : 
                        selectedTag ? 
                            <span className="text-gray-400">
                                Notes Tagged: 
                                <span className="text-black ml-1">
                                    {selectedTag}
                                </span>
                            </span> :
                         "" }
                    </h1>

                    <SearchBar/>
                    <button onClick={handleShowSettings}>
                        <img src={settings_icon} alt="settings icon"/>
                    </button>

                </header>

                <div className="flex flex-row ">

                    <section className=" lg:min-h-full lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-100 scrollbar-rounded-lg lg:w-1/4">
           
                        {(showAllNotes && (!selectedTag && !searchInput)) && <div className=" lg:p-5 border-r border-black">
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
                        {(showAllArchived && (!searchInput && !selectedTag)) && <div className="border-r border-black lg:p-5">
                            <Button1
                                image={<img src={plus} alt="plus logo"/>}
                                text="Create Note"
                                className="bg-blue-700 text-white rounded-xl mb-3 w-full"
                                buttonFunc={handleCreateButton}
                            />
                            <ListOfArchivedNotes/>
                        </div>}

                        {(selectedTag && !searchInput) &&<div>
                            <SelectedTagList/>
                        </div>}

                        {(searchInput  && !selectedTag) && <div className="border-r border-black lg:p-5 min-h-screen">
                            <SearchList/>
                        </div>}

                        {(showSettings && (!selectedTag && !showAllNotes)) && <div className="border-r border-black lg:p-5 min-h-screen">
                            <SettingsOptions/>
                        </div>}
                

                    </section>

                    <section className="lg:h-screen lg:w-1/2  ">
                        { create  ? 
                            <CreateNote 
                                notes={notes} 
                                setNotes={setNotes} 
                                currentNote={currentNote} 
                                setCurrentNote={setCurrentNote} 
                                
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
                        : searchNoteId? <EditNote noteId={searchNoteId} setNoteId={setSearchNoteId}/> 
                        : isThemeModalOpen ? <ColorTheme/> 
                        : isFontModalOpen ? <FontTheme/> 
                        : isPasswordModalOpen ? <ChangePassword/> :  null }
                

                    </section>

                    <section className=" flex flex-col items-center lg:w-1/4 lg:h-screen border-l border-gray-200 pt-4 px-4  ">
                        {(showAllNotes && noteId) && (<div className="flex flex-col w-full ">

                            <ArchiveBtn/>
                            <DeleteBtn/>

                        </div>)}

                        {(showAllArchived && archivedNoteId) && <div className="flex flex-col w-full ">

                            <RestoreBtn/>
                            <DeleteBtn/>
                            
                        </div>}

                        {(selectedTag && tagNoteId) && <div className="flex flex-col w-full ">

                            <ArchiveBtn/>
                            <DeleteBtn/>
                            
                        </div>}

                

                    </section>
                </div>

        </section>
        </div>
        </>
    )

}

export default Notes;