import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './TaskItem.css';

const TaskItem = ({ task, onDeleteTask, onToggleTask, onEditTask }) => {
  const handleToggle = () => {
    onToggleTask(task.id);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleEdit = () => {
    onEditTask(task.id);
  };

  return (
    <div className={`task-item ${task.checked ? 'completed' : ''}`}>
      <Checkbox
        checked={task.checked}
        onChange={handleToggle}
        inputProps={{ 'aria-label': 'complete task checkbox', 'data-testid': `complete-checkbox-${task.id}` }}
      />
      <span className="task-name">{task.name}</span>
      <EditIcon
        className="edit-button"
        onClick={handleEdit}
        data-testid={`edit-button-${task.id}`}
      />
      <DeleteIcon
        className="delete-button"
        onClick={handleDelete}
        data-testid={`delete-button-${task.id}`}
      />
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskItem;
