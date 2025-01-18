import { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { fetchServices } from './Api';
import { useNote } from '../shared/useNote'
import tag_icon from '../../assets/images/icon-tag.svg'


   
const ListOfTags = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [tags, setTags] = useState([]);
    const {setSelectedTag} = useNote();
    

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

    useEffect(() => {
        getTags();
    }, [])

    const handleTag = (tag) => {
        setSelectedTag(tag)
        
    }

    return (
        <section>
                 
                        <div className="sm:min-h-screen md:min-h-1024 lg:min-h-full"> 
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
                                    className="border-b border-gray-300 mb-3 pb-3 "
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
        </section>
    )

}

export default ListOfTags;