import React, { useState } from 'react';
import PropTypes from 'prop-types';


function CreateTaskForm({ onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

CreateTaskForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateTaskForm;