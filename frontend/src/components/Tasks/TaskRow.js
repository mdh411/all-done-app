import React from 'react';
import PropTypes from 'prop-types';

const TaskRow = ({ task }) => {
  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.assignee ? task.assignee : 'Unassigned'}</td>
      <td>{task.status ? task.status : 'Pending'}</td>
    </tr>
  );
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    status: PropTypes.string
  }).isRequired
};

export default TaskRow;
