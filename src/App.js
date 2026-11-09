import React, { useState, useEffect, useMemo } from 'react';

import { TaskForm } from './components/TaskForm';
import { TaskSearch } from './components/TaskSearch';
import { TaskList } from './components/TaskList';

import './App.css';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar tareas desde el archivo tasks.json al iniciar
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        }
      })
      .catch((err) => console.error('Error al cargar tasks.json:', err));
  }, []);

  // Guardar lista de tareas en el archivo tasks.json
  const saveTasksToFile = (updatedTasks) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTasks),
    }).catch((err) => console.error('Error al guardar en tasks.json:', err));
  };

  // 1. Agregar una nueva tarea
  const handleAddTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(), // Generador de ID único nativo de JS
      text,
      completed: false,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [newTask, ...prevTasks];
      saveTasksToFile(updatedTasks);
      return updatedTasks;
    });
  };

  // 2. Alternar estado (completada/pendiente)
  const handleToggleTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasksToFile(updatedTasks);
      return updatedTasks;
    });
  };

  // 3. Eliminar tarea
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      saveTasksToFile(updatedTasks);
      return updatedTasks;
    });
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
