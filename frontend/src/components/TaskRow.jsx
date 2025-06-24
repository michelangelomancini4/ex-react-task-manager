import { memo } from "react";
import { Link } from "react-router-dom";


const TaskRow = memo(({ task }) => {

    console.log("STATO:", task.status);

    const statusColor = {
        Done: "#28a745", // verde
        Doing: "#ffc107",   // giallo

    };

    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link></td>
            <td style={{ backgroundColor: statusColor[task.status] || "#17a2b8", color: "#fff" }}>
                {task.status}
            </td>

            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr >
    );
});

export default TaskRow;
