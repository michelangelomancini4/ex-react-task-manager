import { useState, useRef, useMemo } from "react";

const TaskForm = () => {

    // controlled input
    const [taskTitle, setTaskTitle] = useState("");

    // uncontrolled input
    const descriptionRef = useRef();
    const statusRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    // Check if the title is valid (no symbols, at least 1 character)
    const isTitleValid = useMemo(() => {
        const validTitle = taskTitle.split("").every(char =>
            !symbols.includes(char.toLowerCase())
        );
        return validTitle && taskTitle.length > 0;
    }, [taskTitle]);


    // Function that runs when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !isTitleValid
        ) {
            alert('Per favore compila tutti i campi correttamente.');
            return;
        }

        const newTask = {
            title: taskTitle,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        console.log("Nuova task:", newTask);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </label>
                <br />
                <label className="description_form">
                    Description:
                    <textarea
                        ref={descriptionRef}
                    />
                </label>
                <br />
                <label>
                    Status:
                    <select ref={statusRef}>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <button type="submit">Aggiungi Task</button>

            </form>
        </div>
    )
}

export default TaskForm;