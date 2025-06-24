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

    const addTask = async newTask => {
        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)

        })

        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => [...prev, task])

    };
    const removeTask = () => {

    };
    const updateTask = () => {

    };


    return { tasks, addTask, removeTask, updateTask };



}

