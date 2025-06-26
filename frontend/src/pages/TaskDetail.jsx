import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [ShowModalDelete, setShowModalDelete] = useState();

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
            <button onClick={() => setShowModalDelete(true)}>Delete task!</button>
            <Modal
                title="Conferma eleiminazione"
                content="sicuro di voler eliminare questa Task?"
                show={ShowModalDelete}
                onClose={() => setShowModalDelete(false)}
                onConfirm={handleDelete}
                confirmText="elimina!"
            />
        </div>
    );
}
