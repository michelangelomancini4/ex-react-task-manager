import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const url = import.meta.env.VITE_API_URL;

    // Fetch tasks when the app loads
    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => {

                // Log to verify correct fetch
                // console.log(data);
                setTasks(data);
            })
            .catch(err => console.error("Failed to fetch:", err));
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
