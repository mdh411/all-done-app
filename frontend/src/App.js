// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';

function App() {
    const [tasks, setTasks] = useState([]);

    const handleCreate = (name) => {
        // Hadd code from backend later
        // for now add to local state
        const newTask = { id: Date.now(), name, checked: false };
        setTasks([...tasks, newTask]);
      };

      return (
        <div>
          <CreateTaskForm onCreate={handleCreate} />
          <TaskList tasks={tasks} />
        </div>
      );
}

export default App;
