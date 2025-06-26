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

    // POST

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


    // DELETE
    const removeTask = async taskId => {
        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => prev.filter(task => task.id !== taskId));
    };
    // UPDATE
    const updateTask = async putTask => {
        const response = await fetch(`${url}/tasks/${putTask.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(putTask)
        });

        const { success, message } = await response.json();
        if (!success) throw new Error(message);
        setTasks(prev => prev.map(task => task.id === putTask.id ? putTask : task));
    };


    return { tasks, addTask, removeTask, updateTask };



}
