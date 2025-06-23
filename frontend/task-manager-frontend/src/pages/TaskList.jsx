import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function AddTask() {
    const { tasks } = useContext(GlobalContext);

    return (
        <div>
            <h2>Lista delle Task</h2>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <TaskRow key={index} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddTask;
