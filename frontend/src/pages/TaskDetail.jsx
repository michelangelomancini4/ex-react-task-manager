import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate();

    // Find the task with the matching ID
    const task = tasks.find(t => t.id === Number(id));
    if (!task) return <p>Task not found</p>;

    // Handle task deletion and redirect to homepage
    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task deleted!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="detail-container">
            <h1>Task Detail</h1>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created on: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>Delete task!</button>
        </div>
    );
}
