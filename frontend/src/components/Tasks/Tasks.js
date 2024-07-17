import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskItem from './TaskItem';
import './Tasks.css';
import allDoneLogo from '../../assets/images/all_done_logo_2.png';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    const newTask = { id: tasks.length + 1, name: taskName, checked: false };
    setTasks([...tasks, newTask]);

    axios.post(`${apiUrl}/tasks`, newTask)
      .then(response => {
        setTasks([...tasks, response.data.task]);
      })
      .catch(error => {
        console.error("There was an error adding the task!", error);
      });
  };

  const handleEditTask = (taskId, taskName) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, name: taskName } : task
    );
    setTasks(updatedTasks);

    axios.put(`${apiUrl}/tasks/${taskId}`, { name: taskName })
      .catch(error => {
        console.error("There was an error updating the task!", error);
        setTasks(tasks);
      });
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find(task => task.id === taskId);
    axios.put(`${apiUrl}/tasks/${taskId}`, { checked: updatedTask.checked })
      .catch(error => {
        console.error("There was an error updating the task!", error);
        setTasks(tasks);
      });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));

    axios.delete(`${apiUrl}/tasks/${taskId}`)
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const handleEditTaskOpen = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="tasks-page">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <img src={allDoneLogo} alt="Logo" className="logo" />
      <div className="add-task-button-container">
        <button className="add-task-button" onClick={() => setIsAddModalOpen(true)} data-testid="open-add-task-modal-button">
          Add Task
        </button>
      </div>
      <div className="tasks-container">
        {error && <div className="error">{error}</div>}
        <div className="tasks-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTaskOpen}
            />
          ))}
        </div>
      </div>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
      {taskToEdit && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onEditTask={handleEditTask}
          task={taskToEdit}
        />
      )}
    </div>
  );
};

export default Tasks;
