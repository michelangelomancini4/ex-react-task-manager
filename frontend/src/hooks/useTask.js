import { useState, useEffect } from "react";


export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const url = import.meta.env.VITE_API_URL;


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

    const addTask = () => {

    };
    const removeTask = () => {

    };
    const updateTask = () => {

    };


    return { tasks, addTask, removeTask, updateTask };



}




// Integrare useTasks() nel GlobalContext, in modo che tutti i componenti possano accedere ai task e
// alle funzioni di gestione.