import ReactLoading from "react-loading";
import Navigation from '../shared/Navigation';
import PlusButton from '../shared/PlusButton';
import { SearchBar } from '../shared/NoteComponents';
import { useNote } from '../shared/useNote';
import SearchList from './SearchList';
import { useState } from "react";
const Search = () => {

    const {states} = useNote();

    const {searchInput} = states;
    const [error, setError] = useState(null);
      
    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950 ">
            <div className='min-h-620 md:min-h-1024'>
                <h1 className="font-bold text-2xl mb-3 ">Search</h1>
                <SearchBar/>
               
                <div>
                    
                    {searchInput && <p >All notes matching &#34;{searchInput}&#34; are displayed below </p>}
                    <SearchList/> 
                        
                    
                </div>

            </div>
            <PlusButton/>
            <div className='mt-3'></div>
            <Navigation/>
            

        </section>
    )
}

export default Search;