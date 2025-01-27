import { useState } from 'react';
import { postServices } from './Api';
import tag_icon from '../../assets/images/icon-tag.svg'
import clock_icon from '../../assets/images/icon-clock.svg'
import arrow_left from '../../assets/images/icon-arrow-left.svg'
import Navigation from '../shared/Navigation';
import { BackBtn, CancelBtn, LastEdited, NoteInput, SaveBtn, TagInput, TitleInput } from '../shared/NoteComponents';
import { useNote } from '../shared/useNote';

const CreateNote = ({ currentNote, setCurrentNote}) => {


    const {states} = useNote();
    const {setCreate, setMobileCreate, setNotes} = states;
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
            setCreate(false);
            setMobileCreate(false);
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
                <BackBtn/>

                <div className='flex justify-between w-32 '>
                    
                    <CancelBtn/>
                    <SaveBtn/>
                </div>
                
            </div>

            
            <div className='border-b border-gray-300'>
                <TitleInput value={currentNote.title} onChangeFunc={handleInputChange}/>

                <TagInput value={currentNote.tags} onChangeFunc={handleInputChange}/> 

                
                <LastEdited lastEditedData={currentNote.lastEdited}/> 

            </div>
            <NoteInput value={currentNote.content} onChangeFunc={handleInputChange}/>
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