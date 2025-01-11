import { useEffect, useState } from 'react'
import { fetchServices } from './Api';
import search_icon from '../../assets/images/icon-search.svg'

const Search = ({setCreate}) => {

    const [searchInput, setSearchInput] = useState("");
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    

    //debounce function to prevent too many api calls
    const debounce = (func, delay) => {
        let timeoutId;
        return(...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(null, args)
            }, delay)
        }
    }

    const getNotes = async (searchItem) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchServices.searchNotes(searchItem);
            console.log("fetched data: ", data)
            setNotes(data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const debouncedGetNotes = debounce(getNotes, 300)

    const handleSearchInput = (e) => {
        const {value} = e.target
        setSearchInput(value)
        debouncedGetNotes(value)

    }

   
   

    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950 ">
            <div>
                <h1 className="font-bold text-2xl mb-3 ">Search</h1>
                <input value={searchInput} onChange={handleSearchInput} className='w-full h-4'/>
                <div>
                    <div>{isLoading && <p>Loading...</p>}</div>
                    {notes.map(note => (
                        <div key={note._id}>
                            <h2>{note.title}</h2>

                        </div>
                        
                    ))}
                </div>

            </div>
            

        </section>
    )
}

export default Search;