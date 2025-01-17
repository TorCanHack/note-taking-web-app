import { useContext } from "react"
import { TagContext } from "./TagContext"


export const useTag = () => {

    const context = useContext(TagContext);

    if (context === undefined) {
        throw new Error("useTag must be used within a Tag provider")

    }

    return context
}

