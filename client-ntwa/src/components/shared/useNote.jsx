import { useContext } from "react"
import { NoteContext } from "./NoteContext"


export const useNote = () => {

    const context = useContext(NoteContext);

    if (context === undefined) {
        throw new Error("useTag must be used within a Tag provider")

    }

    return context
}

