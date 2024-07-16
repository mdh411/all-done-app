import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <input type="checkbox" checked={task.checked} readOnly />
      <span className="task-name">{task.name}</span>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskItem;
