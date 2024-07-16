import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <input type="checkbox" checked={task.checked} readOnly />
      <span className="task-name">{task.name}</span>
      <DeleteIcon
        className="delete-button"
        onClick={() => onDelete(task.id)}
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
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
