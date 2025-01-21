import { useState } from 'react';
import { postServices } from './Api';
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import Navigation from '../shared/Navigation';
import { CancelBtn, SaveBtn } from '../shared/NoteComponents';

const CreateNote = ({notes, setNotes, currentNote, setCurrentNote, setCreate, onClose}) => {

    
    //state for form validation
    const [errors, setErrors] = useState({});
    
    //handle input function 
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle tags separately as they need to be converted to an array
        if (name === 'tags') {
            const tagsArray = value.split(',').map(tag => tag.trim());
            setCurrentNote(prev => ({
                ...prev,
                [name]: tagsArray
            }));
        } else {
            setCurrentNote(prev => ({
                ...prev,
                [name]: value
            }));
        }
            
    
        if(errors[name]){
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
    
        }
    };
    
    //handle form submission
    const handleFormSubmission = async (e) => {
        e.preventDefault();
            
        //validate forms
        const newErrors = {};
    
        if (!currentNote.title.trim()) {
            newErrors.title = "Title is required"
    
        }
    
        if (!currentNote.content.trim()) {
            newErrors.content = "Content is required"
        }
    
        if(Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
            return;
        }
    
        try {

            const noteToSubmit = {...currentNote, lastEdited: Date.now() }
            const savedNote = await postServices.postNote(noteToSubmit);

                
            // add new note to the list
            setNotes(prevNote => [savedNote, ...prevNote])
    
            //clear the form
            setCurrentNote({
                title: "",
                content: "",
                tags: [],
                color: '#ffffff',
                createdAt: Date.now()
            })
            onClose();
        } catch(error) {
             console.error("Error creating not", error)
        }
    
    };

    const handleBackButton = (e) => {
        e.preventDefault();
        onClose();
    }
    
    return ( 
        <form className='relative bottom-3 right-4 w-375 largePhone:w-410 rounded-t-md z-10  border border-transparent px-4 md:w-768 lg:w-full lg:pt-4 ' onSubmit={handleFormSubmission} >
            <div className='md:min-h-1024 lg:min-h-full lg:max-h-screen lg:p-5 '>
            <div className='border-b border-black flex flex-row justify-between py-2 lg:hidden'>
                <button className='flex flex-row items-center  w-28 text-sm text-gray-600' onClick={handleBackButton}>
                    <img src={arrow_left} alt="arrow icon" className='w-4 h-4'/>
                    Go back
                </button>

                <div className='flex justify-between w-32 '>
                    
                    <CancelBtn/>
                    <SaveBtn/>
                </div>
                
            </div>

            
            <div className='border-b border-gray-300'>
                <input type="text" name="title" value={currentNote.title} onChange={handleInputChange} placeholder="Enter a title.." className={errors.title ? 'border-red-600' : ' placeholder:font-bold placeholder:text-black placeholder:text-xl my-3' }/>

                <div className='flex flex-row justify-between items-center h-10 mb-3 md:justify-normal '>
                    <div className='flex flex-row w-20 md:w-32 md:mr-2'>
                        <img src={tag_icon} alt='tag icon' className='w-4 h-4 mr-2'/>
                        <p className='text-xs'>Tags</p>

                    </div>
                    
                    <textarea type="text" name="tags" value={currentNote.tags} onChange={handleInputChange} placeholder='Add tags seprated by commas (e.g. Work, Planing)' className='inline-block placeholder:text-xs h-8 resize-none'/>
                </div>  

                <div className='flex flex-row  items-center mb-3'>
                    <div className='flex flex-row  w-32 mr-2'>
                        <img src={clock_icon} alt='clock icon' className='w-4 h-4 mr-2'/> 
                        <h3 className='text-xs'>Last edited</h3>

                    </div>

                    <p className='text-xs text-gray-600'>Not yet saved</p>

                    
                </div> 

            </div>
            <textarea 
                name='content' 
                value={currentNote.content} 
                onChange={handleInputChange} 
                placeholder='Start your typing here...' 
                className={errors.content ? 'border-red-600' : ' resize-none h-511 lg:h-96 w-full placeholder:text-xs placeholder:text-black mt-3 border-b border-gray-300 ' }
            />
            <div className='hidden lg:flex  pt-2 -mt-1  '>
                <SaveBtn/>
                <CancelBtn/>
            </div>
            
            <p>{errors.content}</p>
            </div>
            <Navigation/>
            
        </form>
    )

}

export default CreateNote;