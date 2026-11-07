import React from 'react';

export const TaskSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="task-search">
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};