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

export default Task;