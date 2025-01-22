import { useNote } from "../shared/useNote";
import ReactLoading from 'react-loading'



const SearchList = () => {


    const {states} = useNote();
    const {searchNotes, searchInput, isLoading} = states;
    

    return (
        <div className="px-2">
            {isLoading && <div className="block mx-auto  w-20">
                <ReactLoading 
                    type="bars" 
                    color="blue" 
                    height={50} 
                    width={50} 
                />
            </div>}
            {searchInput && ( searchNotes.length > 0 ? 
            (searchNotes.map(note => (
                <div key={note._id} className="w-full border-b border-gray-400 pb-3 my-3">
                    <h2 className="font-semibold text-base mb-3">
                        <button>{note.title}</button>
                    </h2>
                    <ul className="flex flex-row flex-wrap mb-3  w-full ">
                        {note.tags.map((tag, i) => (
                            <li key={i} className="bg-gray-200 mx-1 text-xs rounded-md p-1 mt-1 -ml-1">{tag}</li>
                        ))}
                    </ul>
                    <p className="text-xs text-gray-700">
                        {new Date(note.lastEdited).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            ))): (<p className='bg-gray-300 rounded-lg p-3 mt-4'> no notes match your search try a different keyword or create a new note</p>))}
            
        </div>
    )
}

export default SearchList;