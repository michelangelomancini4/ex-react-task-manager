import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [editTask, setEditTask] = useState({ ...task });
    const editFormRef = useRef();

    // Handle changes in form inputs 
    const changeEditedTask = (key, event) => {
        setEditTask(prev => ({ ...prev, [key]: event.target.value }));
    };

    // Submit form and  save handler
    const handleSubmit = e => {
        e.preventDefault();
        onSave(editTask);
    };

    const { title, description, status } = editTask;

    return (
        <Modal
            title='Modifica task'
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome task:
                        <input
                            type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </label>
                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            <option value="To do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    );
}
