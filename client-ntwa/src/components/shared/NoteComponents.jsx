import delete_icon from '../../assets/images/icon-delete.svg'
import archive_icon from '../../assets/images/icon-archive.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import { useNote } from './useNote';
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'



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
    
    const { functions} = useNote()

    const {handleBackButton} = functions;
    return (
        <button 
            className='flex flex-row items-center  w-28 text-sm text-gray-600' 
            onClick={handleBackButton}
        >
            <img 
                src={arrow_left} 
                alt="arrow icon" 
                className='w-4 h-4'
            />
            Go back
        </button>
    )
}

export const DeleteBtn = () => {

    const {states} = useNote()

    const { activateDeleteModal} = states;

    return (
        <button onClick={activateDeleteModal}>
            <img 
                src={delete_icon} 
                alt="delete icon" 
                className="w-4 h-4"
            />
        </button>
    )
}

export const DeleteModal = () => {

    const {functions} = useNote()

    const {handleDeleteCancelButton, handleDeleteButton} = functions
    return (
        <div className="relative bottom-97 w-343 h-48 p-4 rounded-lg border border-black z-30 bg-white mx-auto">
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
                    className="h-10 w-24 bg-gray-200 rounded-xl"
                    onClick={handleDeleteCancelButton}
                >
                    Cancel
                </button>

                <button 
                    onClick={handleDeleteButton}
                    className="h-10 w-28 bg-red-600 rounded-xl ml-3"
                >
                    Delete
                </button>
            </div>
                               
        </div>
    )
} 

export const LastEdited = () => {
    const {states} = useNote();
    const {note, setNote} = states;
    
    return (
        <div className='flex flex-row  items-center mb-3'>
            <div className='flex flex-row  w-32 mr-2'>
                <img 
                    src={clock_icon} 
                    alt='clock icon' 
                    className='w-4 h-4 mr-2'
                /> 
                <h3 className='text-xs'>Last edited</h3>
                
            </div>
                
            <p className='text-xs text-gray-600'>
                {new Date(note.lastEdited).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })}
            </p>
                
                                    
        </div> 
    )
} 

export const NoteInput = () => {
    const {states} = useNote();
    const {note, setNote} = states;
    return (
        <textarea 
            name='content' 
            value={note.content} 
            onChange={(e) => setNote({...note, content: e.target.value})} 
            placeholder='Start your typing here...' 
            className="text-sm resize-none h-511 lg:h-96 w-full placeholder:text-xs placeholder:text-black mt-3"
        />
    )
}

export const Overlay = () => {
    return (
        <div className="absolute top-0 right-0 h-970 w-full bg-black opacity-50 z-20  md:h-1050"></div>
    )
}

export const ArchiveBtn = () => {
    const {states} = useNote()
    const { activateArchiveModal} = states;
    return (
        <button onClick={activateArchiveModal}>
            <img 
                src={archive_icon} 
                alt="archive_icon" 
                className="w-4 h-4"
            />
        </button>
    )
}

export const SaveBtn = () => {
    return (
        <button 
            type='submit' 
            className='text-blue-400 text-sm'
        >
            Save Note
        </button>
    )
}

export const TagInput = () => {
    const {states} = useNote();
    const {note, setNote} = states;

    return (
          <div className='flex flex-row justify-between items-center h-10 mb-3 md:justify-normal '>
                <div className='flex flex-row w-20 md:w-32 md:mr-2'>
                    <img 
                        src={tag_icon} 
                        alt='tag icon' 
                        className='w-4 h-4 mr-2'
                    />
                    <p className='text-xs'>Tags</p>
                
                </div>
                                    
                <textarea 
                    type="text" 
                    name="tag" 
                    value={note.tags} 
                    onChange={(e) => setNote({...note, tags: e.target.value.split(",").map(tag => tag.trim())})} placeholder='Add tags seprated by commas (e.g. Work, Planing)' 
                    className='inline-block placeholder:text-xs h-8 resize-none'
                />
            </div>
    )
}

export const TitleInput = () => {
    const {states} = useNote();
    const {note, setNote} = states;
    return (
          <input 
                type="text" 
                name="title" value={note.title} 
                onChange={(e) => setNote({...note, title: e.target.value})} 
                placeholder="Enter a title.." 
                className=" text-2xl font-bold placeholder:font-bold placeholder:text-black placeholder:text-xl my-3"
            />
    )
}

export const CancelBtn = () => {
    return (
        <button className='text-sm text-gray-600'>Cancel</button>
    )
}