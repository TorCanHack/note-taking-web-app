import Navigation from "../shared/Navigation";
import EditNote from "./EditNote";
import PlusButton from "../shared/PlusButton";




const Tags = ({setCreate}) => {

    
    
    
   
    
    
    



   

    

  

   

    return (
        <section className=" bg-white rounded-t-lg pt-3 px-2   ">
            
            <EditNote noteId={noteId} setNoteId={setNoteId} source={source}/>
            <PlusButton setCreate={setCreate}/>
            <div className="mt-3"></div>
            <Navigation/>

        </section>
    )

}

export default Tags;

