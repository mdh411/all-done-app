import React from 'react';

const Task = ({ task, onToggle }) => (
  <div>
    <input
      type="checkbox"
      checked={task.checked}
      onChange={() => onToggle(task.id)}
    />
    {task.name}
  </div>
);

Task.propTypes = {
  task: PropTypes.shape({
    checked: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Task;