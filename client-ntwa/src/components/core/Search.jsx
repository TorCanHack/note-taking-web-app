import { useEffect, useState } from 'react'
import { fetchServices } from './Api';
import search_icon from '../../assets/images/icon-search.svg'
import ReactLoading from "react-loading";
import Navigation from '../shared/Navigation';
import PlusButton from '../shared/PlusButton';

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
            <div className='min-h-620 md:min-h-1024'>
                <h1 className="font-bold text-2xl mb-3 ">Search</h1>
                <input 
                    name='search' 
                    value={searchInput} 
                    onChange={handleSearchInput} 
                    className='w-full h-52 border border-gray-500 rounded-lg bg-gray-200 px-10'
                />
                <img 
                    src={search_icon}
                    alt='search icon'
                    className='relative bottom-9 left-4'
                />
                <div>
                    {isLoading && <div className="block mx-auto  w-20">
                        <ReactLoading 
                            type="bars" 
                            color="blue" 
                            height={50} 
                            width={50} 
                        />
                    </div>}
                    {searchInput && <p>All notes matching &#34;{searchInput}&#34; are displayed below </p>}
                    {searchInput && ( notes.length > 0 ?  
                        (notes.map(note => (
                            <div key={note._id}>
                                <h2>{note.title}</h2>

                            </div>))) 
                        : (<p className='bg-gray-300 rounded-lg p-3 mt-4'> no notes match your search try a different keyword or create a new note</p>))
                    }
                </div>

            </div>
            <PlusButton setCreate={setCreate}/>
            <div className='mt-3'></div>
            <Navigation/>
            

        </section>
    )
}

export default Search;