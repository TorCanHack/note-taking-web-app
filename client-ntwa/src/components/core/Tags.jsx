import { useEffect, useState } from "react";
import { fetchServices } from "./Api";
import tag_icon from '../../assets/images/icon-tag.svg'
import Navigation from "../shared/Navigation";
import EditNote from "./EditNote";
import PlusButton from "../shared/PlusButton";
import ReactLoading from "react-loading";
import left_arrow_icon from "../../assets/images/icon-arrow-left.svg"

const Tags = ({setCreate}) => {

    const [tags, setTags] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errror, setError] = useState(null);
    const [noteId, setNoteId] = useState(null);
    const [source, setSource] = useState(null);
    


    const getTags = async () => {
        try {

            
            setIsLoading(true)
            const data =  await fetchServices.fetchNotes()
            const uniqueTags = [...new Set(data.flatMap(note => note.tags))]
            
            setTags(uniqueTags)

        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getNotesByTag = async (tag) => {

        try {
            setIsLoading(true)
            const data = await fetchServices.searchTags(tag)
            setNotes(data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }

    }

    const handleTag = (tag) => {
        setSelectedTag(tag)
        getNotesByTag(tag)
    }

    const handleBackToTags = () => {

        setSelectedTag(null);
        setNotes([])
    }

    const handleNoteClickInTags = (note_Id) => {
        
        setNoteId(note_Id)
        setSource("tags")

    }

    useEffect(() => {
        getTags();
    }, [])

    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950 ">
            {!selectedTag ? 
            <div className="min-h-620"> 
                <h1 className="font-semibold text-2xl mb-5">Tags</h1>
                {isLoading && <div className="block mx-auto  w-20">
                    <ReactLoading 
                        type="bars" 
                        color="blue" 
                        height={50} 
                        width={50} 
                    />
                </div>}
                
                {tags.map((tag) => (
                    <div 
                        key={tag}
                        className="border-b border-gray-300 mb-3 pb-3"
                    >
                        <ul>
                            <li>
                                <button 
                                    className="flex flex-row justify-center items-center w-auto" 
                                    onClick={() => handleTag(tag)}
                                >
                                    <img 
                                        src={tag_icon} 
                                        alt="tag icon" 
                                        className="h-4 w-4 mr-2"
                                    />
                                    {tag}
                                </button>
                            </li>
                        </ul>

                    </div>
                ))}
            </div>
            : (!noteId ? <div >
                {isLoading && <div className="block mx-auto  w-20">
                    <ReactLoading 
                        type="bars" 
                        color="blue" 
                        height={50} 
                        width={50} 
                    />
                </div>}
                <button 
                    className="flex flex-row items-center text-sm"
                    onClick={handleBackToTags}
                >
                    <img 
                        src={left_arrow_icon} 
                        alt="go back icon"
                        className="w-5 h-5"
                    />
                    Go back
                </button>
                <div className="min-h-620 ">
                    <h1 className="font-bold text-2xl mt-3 text-gray-500">Notes Tagged: <span className="text-black">{selectedTag}</span> </h1>
                    <p className="my-3">All notes with the &#34;{selectedTag}&#34; tag are shown here</p>
                    {notes.map(note => (
                        <div 
                            key={note._id}
                            className="mb-3 border-b border-gray-300 pb-3 pl-2" 
                        >
                            <h2 className="mb-2 font-bold">
                                <button onClick={() => handleNoteClickInTags(note._id)}>
                                    {note.title}
                                </button>
                            </h2>
                            <ul className="flex flex-row mb-2 -ml-2">
                                {note.tags.map((tag, i) => (
                                    <li key={i} className="bg-gray-300 mx-1 text-xs rounded-md p-1">{tag}</li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-700">{new Date(note.lastEdited).toLocaleDateString('en-GB', {
                                 day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}</p>

                        </div>
                
                    ))}
                </div>
                
                
                
            </div> : <EditNote noteId={noteId} setNoteId={setNoteId} source={source}/>)}
            <PlusButton setCreate={setCreate}/>
            <div className="mt-3"></div>
            <Navigation/>

        </section>
    )

}

export default Tags;