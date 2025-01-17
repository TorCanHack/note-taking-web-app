import { useState } from 'react';
import ReactLoading from 'react-loading';
import { fetchServices } from './Api';
import {useTag} from '../shared/useTag';
import left_arrow_icon from "../../assets/images/icon-arrow-left.svg"

const SelectedTagList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [noteId, setNoteId] = useState(null);
    const [tagNotes, setTagNotes] = useState([]);
    const {selectedTag, setSelectedTag} = useTag();
    const [source, setSource] = useState(null);

    const handleBackToTags = () => {

        setSelectedTag(null);
        setTagNotes([])
    }

    const handleNoteClickInTags = (note_Id) => {
        
        setNoteId(note_Id)
        setSource("tags")

    }

    const getNotesByTag = async (tag) => {
    
        try {
            setIsLoading(true)
            const data = await fetchServices.searchTags(tag)
            setTagNotes(data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    
    }

    useState(() => {
        getNotesByTag(selectedTag);
    }, [selectedTag])

    return (
        <section>
            <div >
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
                    {tagNotes.map(note => (
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
                
                
                
            </div>
        </section>
    )

}

export default SelectedTagList;