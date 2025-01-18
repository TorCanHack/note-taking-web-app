import { useEffect,  useState } from "react";

import Navigation from "../shared/Navigation";
import PlusButton from "../shared/PlusButton";
import EditArchivedNote from "./EditArchivedNote";
import ReactLoading from "react-loading";

const ArchivedNotes = ( {setCreate} ) => {

    

    
    
    
    const [showMobileNotes, setShowMobileNotes] =useState(false);
    
    

   

    

    return(
        <section className=" bg-white rounded-t-lg pt-3 px-4  w-375 largePhone:w-410 md:w-768 lg:w-950">
            {!showMobileNotes ? 
            <PlusButton setCreate={setCreate}/>
            
            : <EditArchivedNote archivedNoteId={archivedNoteId} setArchivedNoteId={setArchivedNoteId} />}

            <Navigation/>
        </section>
    )

}

export default ArchivedNotes;