import React from 'react';

function Task({ task }) {
  return (
    <div>
      <input type="checkbox" checked={task.checked} />
      <label>{task.name}</label>
    </div>
  );
}

export default Task;