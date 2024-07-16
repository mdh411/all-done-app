import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskItem from './TaskItem';
import './Tasks.css';
import allDoneLogo from '../../assets/images/all_done_logo_2.png';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch tsks from api on component mount
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

  // Handle adding a new task
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

  // Handle editing an existing task
  const handleEditTask = (taskId, taskName) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, name: taskName } : task
    );
    setTasks(updatedTasks);

    axios.put(`${apiUrl}/tasks/${taskId}`, { name: taskName })
      .catch(error => {
        console.error("There was an error updating the task!", error);
        setTasks(tasks); // Revert back to original tasks on error
      });
  };

  // Handle toggling the completion state of a task
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

  // handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));

    axios.delete(`${apiUrl}/tasks/${taskId}`)
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  // Open the edit task modal and set the task to be edited
  const handleEditTaskOpen = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <img src={allDoneLogo} alt="Logo" className="logo" />
      <button className="add-task-button" onClick={() => setIsAddModalOpen(true)} data-testid="open-add-task-modal-button">
        + ADD TASK
      </button>
      <div className="tasks-container">
        {error && <div className="error">{error}</div>}
        <div className="tasks-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTaskOpen} // Pass the edit handler to TaskItem
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
