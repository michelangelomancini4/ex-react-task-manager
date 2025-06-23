import { memo } from "react";

const TaskRow = memo(({ task }) => {

    console.log("STATO:", task.status);

    const statusColor = {
        Done: "#28a745", // verde
        Doing: "#ffc107",   // giallo

    };

    return (
        <tr>
            <td>{task.title}</td>
            <td style={{ backgroundColor: statusColor[task.status] || "#17a2b8", color: "#fff" }}>
                {task.status}
            </td>

            <td>{task.createdAt}</td>
        </tr >
    );
});

export default TaskRow;
