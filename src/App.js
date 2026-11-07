import React, { useState, useMemo } from 'react';

import { TaskForm } from './components/TaskForm';
import { TaskSearch } from './components/TaskSearch';
import { TaskList } from './components/TaskList';

import './App.css';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Agregar una nueva tarea
  const handleAddTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(), // Generador de ID único nativo de JS
      text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // 2. Alternar estado (completada/pendiente)
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. Eliminar tarea
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // 4. Contador de tareas
  const tasksCounter = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  // 5. Contador de tareas pendientes
  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  // 6. Filtrar tareas según la búsqueda
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  return (
    <main className="app-container">
      <header>
        <h1>Lista de tareas</h1>
        <br/>
        <p className="tasks-counter">
          Tareas: <strong>{tasksCounter}</strong>
        </p>
        <br/>
        <p className="pending-counter">
          Pendientes: <strong>{pendingTasks}</strong>
        </p>
        <br/>
      </header>

      <section className="controls">
        <TaskForm onAddTask={handleAddTask} />
        <TaskSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      <section className="list-container">
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </section>
    </main>
  );
}

export default App;
