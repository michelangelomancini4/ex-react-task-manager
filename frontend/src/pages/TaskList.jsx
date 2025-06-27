import { useContext, useMemo, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    // State for sorting field and order (ascending = 1, descending = -1)
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? "🠗" : "🠕";

    // Handle table header click to sort by field
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    // Memoized sorted list of tasks
    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;

            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'status') {
                const statusOptions = ["To do", "Doing", "Done"];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }

            return comparison * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]);

    return (
        <div>
            <h2>Lista delle Task</h2>

            <table className="task-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === 'status' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di Creazione {sortBy === 'createdAt' && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map((task, index) => (
                        <TaskRow key={index} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
