import { useState, useRef, useMemo, useContext } from "react";
import GlobalContext from "../context/GlobalContext";


const TaskForm = () => {

    const { addTask } = useContext(GlobalContext);

    // controlled input
    const [taskTitle, setTaskTitle] = useState("");

    // uncontrolled input
    const descriptionRef = useRef();
    const statusRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const errorMessage = useMemo(() => {
        if (taskTitle.trim().length === 0) {
            return 'Il titolo non può essere vuoto';
        }
        if (taskTitle.split("").some(char => symbols.includes(char))) {
            return 'Il titolo non può contenere simboli speciali';
        }
        return '';
    }, [taskTitle]);



    // Function that runs when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errorMessage) {
            alert(errorMessage);
            return;
        }


        const newTask = {
            title: taskTitle,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        try {

            await addTask(newTask);

            alert("Task creata!")
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = ""

        } catch (error) {
            alert(error.message)
        }
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
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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