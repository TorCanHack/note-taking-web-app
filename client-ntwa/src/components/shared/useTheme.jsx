import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a theme provider")
    }
    return context;
}