import delete_icon from '../../assets/images/icon-delete.svg'
import delete_icon_dark from '../../assets/images/icon-delete dark.svg'
import archive_icon from '../../assets/images/icon-archive.svg'
import archive_icon_dark from '../../assets/images/icon-archive dark.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import arrow_left_dark from '../../assets/images/icon-arrow-left copy.svg'
import { useNote } from './useNote';
import tag_icon from '../../assets/images/icon-tag.svg'
import tag_icon_dark from '../../assets/images/icon-tag dark.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import clock_icon_dark from '../../assets/images/icon-clock dark.svg'
import restore_icon from '../../assets/images/icon-restore.svg'
import restore_icon_dark from '../../assets/images/icon-restore dark.svg'
import search_icon from '../../assets/images/icon-search.svg'
import search_icon_dark from '../../assets/images/icon-search dark.svg'
import { useTheme } from './useTheme';

export const ArchiveBtn = () => {

    const {theme} = useTheme()
    const {functions} = useNote()
    const { activateArchiveModal} = functions;
    return (
        <button form="note" onClick={activateArchiveModal} className= "lg:flex lg:flex-row lg:justify-start lg:items-center lg:w-full lg:h-11 lg:border lg:border-gray-300 lg:rounded-xl lg:font-bold lg:p-4 lg:mb-4">
            {theme === 'light' ?
            <img 
                src={archive_icon} 
                alt="archive_icon" 
                className={`w-5 h-5`}
            />
            :
            <img 
                src={archive_icon_dark} 
                alt="archive_icon" 
                className={`w-5 h-5`}
            />}
            <span className='hidden lg:flex lg:ml-3 lg:text-sm'>Archive Note</span>
        </button>
    )
}

export const ArchiveModal = () => {

    const {functions} = useNote()

    const {handleArchiveButton, handleArchiveCancelButton} = functions

    return (
        <div className="relative bottom-97 w-343 h-auto p-4 rounded-lg border border-black z-30 bg-white mx-auto">
            <div className="flex flex-row justify-between items-center border-b border-black">
                <div className="flex flex-col justify-center items-center bg-gray-200 h-10 w-10 rounded-xl">
                    <img
                        src={archive_icon}
                        alt="archive icon"
                                
                    />
                </div>
                <div className="flex flex-col w-247 mb-4">
                    <h3 className="text-base font-bold mb-1">Archive Note</h3>
                    <p className="text-sm">Are you sure you want to archive this note? You can find it in the archived section and restore it anytime.</p>

                </div>

            </div>
            <div className="flex flex-row justify-end  pt-4">
                <button 
                    className="h-10 w-24 bg-gray-200 rounded-xl"
                    onClick={handleArchiveCancelButton}
                >
                    Cancel
                </button>
                <button 
                    onClick={handleArchiveButton}
                    className="h-10 w-28 bg-blue-600 rounded-xl ml-3"
                >
                    Archive
                </button>
            </div>
                        
        </div>
    )
}

export const BackBtn = () => {
    
    const {theme} = useTheme();
    const { functions} = useNote()

    const {handleBackButton} = functions;
    return (
        <button 
            className='flex flex-row items-center  w-28 text-sm text-gray-600' 
            onClick={handleBackButton}
        >
            {theme === 'light' ? 
            <img 
                src={arrow_left} 
                alt="arrow icon" 
                className='w-4 h-4'
            />
            :
            <img 
                src={arrow_left_dark} 
                alt="arrow icon" 
                className='w-4 h-4'
            />}
            Go back
        </button>
    )
}

export const DeleteBtn = () => {

    const {theme} = useTheme();
    const {functions} = useNote()

    const { activateDeleteModal} = functions;

    return (
        <button 
        
            form='note'
            onClick={activateDeleteModal} 
            className= "lg:flex lg:flex-row lg:justify-start lg:items-center lg:w-full lg:h-11 lg:border lg:border-gray-300 lg:rounded-xl lg:font-bold lg:p-4">
            {theme === 'light'? 
            <img 
                src={delete_icon} 
                alt="delete icon" 
                className="w-5 h-5"
            />
            :
            <img 
                src={delete_icon_dark} 
                alt="delete icon" 
                className="w-5 h-5"
            />}
            <span className='hidden lg:flex lg:ml-3 lg:text-sm '>Delete</span>
        </button>
    )
}

export const DeleteModal = () => {

    const {functions} = useNote()

    const {handleDeleteCancelButton, handleDeleteButton} = functions
    return (
        <div className="relative bottom-97 w-343 h-48 p-4 rounded-lg border border-black z-30 bg-white mx-auto dark:bg-neutral-600">
            <div className="flex flex-row justify-between items-center border-b border-black">
                <div className="flex flex-col justify-center items-center bg-gray-200 h-10 w-10 rounded-xl">
                    <img
                        src={delete_icon}
                        alt="delete icon"                    
                    />
                </div>
                <div className="flex flex-col w-247 mb-4">
                    <h3 className="text-base font-bold mb-1">Delete</h3>
                    <p className="text-sm">Are you sure you want to permanetly delete this note? This act cannot be undone</p>
        
                </div>
        
            </div>
            <div className="flex flex-row justify-end  pt-4">
                <button 
                    className="h-10 w-24 bg-gray-200 rounded-xl dark:bg-neutral-500"
                    onClick={handleDeleteCancelButton}
                >
                    Cancel
                </button>

                <button 
                    onClick={handleDeleteButton}
                    className="h-10 w-28 bg-red-600 rounded-xl ml-3"
                    form='note'
                >
                    Delete
                </button>
            </div>
                               
        </div>
    )
} 

export const LastEdited = ({lastEditedData}) => {

    const {theme} = useTheme()
    const {states} = useNote();
    const {noteId} = states;

    return (
        <div className='flex flex-row  items-center mb-3'>
            <div className='flex flex-row  w-32 mr-2'>
                {theme === 'light'? 
                <img 
                    src={clock_icon} 
                    alt='clock icon' 
                    className='w-4 h-4 mr-2'
                /> 
                :
                <img 
                    src={clock_icon_dark} 
                    alt='clock icon' 
                    className='w-4 h-4 mr-2'
                /> }
                <h3 className='text-xs'>Last edited</h3>
                
            </div>
                
            <p className='text-xs text-gray-600 dark:text-gray-300'>
                {noteId ?  new Date(lastEditedData).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }): "not yet saved"}
            </p>
                
                                    
        </div> 
    )
} 

export const NoteInput = ({value, onChangeFunc}) => {
    
    return (
        <textarea 
            name='content' 
            value={value} 
            onChange={onChangeFunc} 
            placeholder='Start your typing here...' 
            className="text-sm resize-none h-511 lg:h-96 w-full placeholder:text-xs placeholder:text-black mt-3 lg:border-b border-gray-300 dark:bg-neutral-950"
        />
    )
}

export const Overlay = () => {
    return (
        <div className="absolute top-0 right-0 h-970 w-full bg-black opacity-50 z-20  md:h-1050 lg:min-h-1024 lg:max-h-screen  dark:opacity-70"></div>
    )
}

export const RestoreBtn = () => {

    const {theme} = useTheme();
    const {functions} = useNote();
    const{handleRestoreButton} = functions;

    return(
        <button onClick={handleRestoreButton} className= "lg:flex lg:flex-row lg:justify-start lg:items-center lg:w-full lg:h-11 lg:border lg:border-gray-300 lg:rounded-xl lg:font-bold lg:p-4 lg:mb-2">
            {theme === 'light' ?
            <img 
                src={restore_icon} 
                alt="archive_icon" 
                className="w-5 h-5"
                
            />
            :
            <img 
            src={restore_icon_dark} 
            alt="archive_icon" 
            className="w-5 h-5"
            />}
            <span className='hidden lg:flex lg:ml-3 lg:text-sm '>Restore</span>
        </button>
    )
}

export const SaveBtn = () => {
    {/*const {functions} = useNote();
    const {getTags} = functions;**/}
    return (
        <button 
            type='submit' 
            /*onClick={getTags()}**/
            className='text-blue-400 text-sm lg:w-24 lg:h-10 lg:bg-blue-600 lg:text-white lg:rounded-lg '
        >
            Save Note
        </button>
    )
}

export const SearchBar = () => {

    const {theme} = useTheme()
    const {states, functions} = useNote();
    const {searchInput} = states;
    const {handleSearchInput} = functions;

    return (
        <div className=' lg:h-1/2 '>
            <input 
                name='search' 
                value={searchInput} 
                onChange={handleSearchInput} 
                className='w-full h-52 border border-gray-500 rounded-lg bg-gray-200 px-10 lg:w-300 lg:h-full dark:bg-neutral-950 dark:border-gray-300'
            />
            {theme === 'light' ?
            <img 
                src={search_icon}
                alt='search icon'
                className='relative bottom-9 left-4 lg:bottom-7'
            />
            :
            <img 
                src={search_icon_dark}
                alt='search icon'
                className='relative bottom-9 left-4 lg:bottom-7'
            />}

        </div>
    )
}

export const TagInput = ({value, onChangeFunc}) => {
    
    const {theme} = useTheme()

    return (
          <div className='flex flex-row justify-between items-center h-10 mb-3 md:justify-normal '>
                <div className='flex flex-row w-20 md:w-32 md:mr-2'>
                    {theme === 'light' ? 
                    <img 
                        src={tag_icon} 
                        alt='tag icon' 
                        className='w-4 h-4 mr-2'
                    />
                    :
                    <img 
                        src={tag_icon_dark} 
                        alt='tag icon' 
                        className='w-4 h-4 mr-2'
                    />}
                    <p className='text-xs'>Tags</p>
                
                </div>
                                    
                <textarea 
                    type="text" 
                    name="tag" 
                    value={value} 
                    onChange={onChangeFunc} 
                    placeholder='Add tags seprated by commas (e.g. Work, Planing)' 
                    className='inline-block placeholder:text-xs h-8 resize-none dark:bg-neutral-950'
                />
            </div>
    )
}

export const TitleInput = ({value, onChangeFunc}) => {
    
    return (
        <input 
            type="text" 
            name="title" 
            value={value} 
            onChange={onChangeFunc} 
            placeholder="Enter a title.." 
            className=" text-2xl font-bold placeholder:font-bold placeholder:text-black placeholder:text-xl my-3 dark:bg-neutral-950 placeholder:dark:text-white"
        />
    )
}

export const CancelBtn = () => {
    const {functions} = useNote()

    const {handleCancelButton} = functions
    return (
        <button 
            className='text-sm text-gray-600 lg:w-24 lg:h-10 lg:bg-gray-200 lg:text-black lg:rounded-lg lg:ml-4' onClick={handleCancelButton}>
            
            Cancel
        </button>
    )
}