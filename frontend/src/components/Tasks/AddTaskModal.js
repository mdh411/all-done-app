import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './AddTaskModal.css';

Modal.setAppElement('#root');

const AddTaskModal = ({ isOpen, onRequestClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Task"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired
};

export default AddTaskModal;
