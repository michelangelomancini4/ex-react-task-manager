import { createContext } from "react";
import useTasks from "../hooks/useTask";

// // Create a new context to share global state
const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const taskData = useTasks();

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
