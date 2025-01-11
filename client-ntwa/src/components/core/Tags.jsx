import { useEffect, useState } from "react";
import { fetchServices } from "./Api";
import tag_icon from '../../assets/images/icon-tag.svg'
import Navigation from "../shared/Navigation";
import EditNote from "./EditNote";

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
            {!selectedTag ? <div>
                <h1 className="font-semibold text-base">Tags</h1>
                {tags.map((tag) => (
                    <div key={tag}>
                        <ul>
                            <li>
                                <button className="flex flex-row justify-center items-center w-auto" onClick={() => handleTag(tag)}>
                                    <img src={tag_icon} alt="tag icon" className="h-4 w-4 mr-2"/>
                                    {tag}
                                </button>
                            </li>
                        </ul>

                    </div>
                ))}
            </div>
            : (!noteId ? <div >
                <div className="min-h-620 ">
                    <h1>Notes Tagged: {selectedTag} </h1>
                    <p>All notes with the {selectedTag} tag are shown here</p>
                    {notes.map(note => (
                        <div key={note._id} >
                            <h2><button onClick={() => handleNoteClickInTags(note._id)}>{note.title}</button></h2>
                            <ul className="flex flex-row">
                                {note.tags.map((tag, i) => (
                                    <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1">{tag}</li>
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
                
                <Navigation/>
                
            </div> : <EditNote noteId={noteId} setNoteId={setNoteId} source={source}/>)}

        </section>
    )

}

export default Tags;