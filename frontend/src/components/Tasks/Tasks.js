import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskModal from './AddTaskModal';
import TaskItem from './TaskItem';
import './Tasks.css';
import allDoneLogo from '../../assets/images/all_done_logo_2.png';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        setError('There was an error retrieving the tasks!');
        console.error("There was an error retrieving the tasks!", error);
      });
  }, [apiUrl]);

  const handleAddTask = (taskName) => {
    axios.post(`${apiUrl}/tasks`, { name: taskName, checked: false })
      .then(response => {
        setTasks([...tasks, response.data.task]);
      })
      .catch(error => {
        console.error("There was an error adding the task!", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`${apiUrl}/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <div>
      <img src={allDoneLogo} alt="Logo" className="logo" />
      <button className="add-task-button" onClick={() => setIsModalOpen(true)} data-testid="open-add-task-modal-button">
        + ADD TASK
      </button>
      <div className="tasks-container">
        {error && <div className="error">{error}</div>}
        <div className="tasks-list">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Tasks;
