import React from 'react';
import { Item } from './Item';

export const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <p className="empty-message">No se encontraron tareas.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Item
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};