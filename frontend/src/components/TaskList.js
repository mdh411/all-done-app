import React from 'react';
import Task from './Task';

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default TaskList;