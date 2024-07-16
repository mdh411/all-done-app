import React from 'react';
import PropTypes from 'prop-types';
import TaskRow from './TaskRow';

const TaskTable = ({ tasks }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Assignee</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      assignee: PropTypes.string,
      status: PropTypes.string
    })
  ).isRequired
};

export default TaskTable;
