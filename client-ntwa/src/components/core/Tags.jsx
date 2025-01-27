import Navigation from "../shared/Navigation";
import EditNote from "./EditNote";
import PlusButton from "../shared/PlusButton";
import ListOfTags from "./ListOfTags";
import SelectedTagList from "./SelectedTagList";
import { useNote } from "../shared/useNote";




const Tags = () => {

    const {states} = useNote();
    const {selectedTag, tagNoteId, setTagNoteId} = states;

     

    return (
        <section className="w-screen  rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950 dark:text-white">
           {!tagNoteId ? <div>
             <div>{!selectedTag ? <ListOfTags/> : <SelectedTagList/>}</div>
             
            <PlusButton/>
            <div className="mt-3"></div>
            <Navigation/>
            </div> : <EditNote noteId={tagNoteId} setNoteId={setTagNoteId}/>}

        </section>
    )

}

export default Tags;

