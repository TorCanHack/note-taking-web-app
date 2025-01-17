import { Children } from "react"
import { TagContext } from "./TagContext"
import { useState } from "react"

export const TagProvider = ({children}) => {

    const [selectedTag, setSelectedTag] = useState(null)

    return (
        <TagContext.Provider value={{selectedTag, setSelectedTag}}>
            {children}
        </TagContext.Provider>
    )
}

