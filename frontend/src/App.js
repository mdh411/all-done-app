// src/App.js
import React, { useState, useEffect } from 'react';
import Task from './components/Task';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/tasks')
            .then(response => response.json())
            .then(data => setTasks(data.tasks));
    }, []);

    return (
        <div>
            <h1>AllDone App</h1>
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

export default App;
