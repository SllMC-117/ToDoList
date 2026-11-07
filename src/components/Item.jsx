import React from 'react';

export const Item = ({ task, onToggleTask, onDeleteTask }) => {
    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <div className="todo-item-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                />
                <span>{task.text}</span>
            </div>
            <button
                className="btn-delete"
                onClick={() => onDeleteTask(task.id)}
                aria-label="Eliminar tarea"
            >
                &times;
            </button>
        </li>
    );
};