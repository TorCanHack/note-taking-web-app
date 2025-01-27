import { useState } from "react";

import Navigation from "../shared/Navigation";
import PlusButton from "../shared/PlusButton";
import EditArchivedNote from "./EditArchivedNote";
import ListOfArchivedNotes from "./ListOfArchivedNotes";
import { useNote } from "../shared/useNote";

const ArchivedNotes = ( {setCreate} ) => {

    const {states} = useNote();
    const {archivedNoteId, setArchivedNoteId, showMobileNotes} = states;

    return(
        <section className=" rounded-t-lg pt-3 px-2  w-screen  md:w-768 lg:w-950">
            {!showMobileNotes ? 
            <div> 
                <ListOfArchivedNotes/>
                <PlusButton/>
            </div>
            
            : 
            <EditArchivedNote 
                archivedNoteId={archivedNoteId} 
                setArchivedNoteId={setArchivedNoteId} 
            /> }
            <div className="mt-3"></div>

            <Navigation/>
            
        </section>
    )

}

export default ArchivedNotes;