import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import AddTaskModal from './AddTaskModal';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, [apiUrl]);

  const handleAddTask = (taskName) => {
    const newTask = { id: tasks.length + 1, name: taskName, assignee: null, status: 'Pending' };
    setTasks([...tasks, newTask]);
// persist by sending to backend - later ticke

    // axios.post(`${apiUrl}/tasks`, newTask)
    //   .then(response => {
    //     setTasks([...tasks, response.data.task]);
    //   })
    //   .catch(error => {
    //     console.error("There was an error adding the task!", error);
    //   });
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <button className="add-task-button" onClick={() => setIsModalOpen(true)}>Add Task</button>
      <AddTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default Tasks;
