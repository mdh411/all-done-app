import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        setError("There was an error retrieving the tasks!");
        console.error("There was an error retrieving the tasks!", error);
      });
  }, [apiUrl]);

  return (
    <div>
      <h1>Tasks</h1>
      {error ? (
        <div>{error}</div>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.name} - {task.checked ? 'Completed' : 'Incomplete'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
