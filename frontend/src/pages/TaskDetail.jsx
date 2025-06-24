
import { useParams } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";


export default function TaskDetail() {

    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    // Trova il task con quell'id
    const task = tasks.find(t => t.id === Number(id));
    if (!task) return <p>Task non trovato</p>;

    function onClick() {
        console.log('Elimina task!');
    }
    return (
        <div className="detail-container">
            <h1>Dettaglio Task</h1>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Stato: {task.status}</p>
            <p>Creato il: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={onClick}>Elimina task!</button>
        </div>
    );
}