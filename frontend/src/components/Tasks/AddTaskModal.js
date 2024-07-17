import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './TaskModal.css';

Modal.setAppElement('#root');

const AddTaskModal = ({ isOpen, onRequestClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }
    if (taskName.length > 100) {
      setError('Task name cannot exceed 100 characters.');
      return;
    }
    onAddTask(taskName);
    setTaskName('');
    setError('');
    onRequestClose();
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
      {error && <div className="error-message" data-testid="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          data-testid="task-input"
        />
        <div className="modal-buttons">
          <button type="submit" data-testid="modal-add-task-button">Add Task</button>
          <button type="button" onClick={onRequestClose} className="cancel-button" data-testid="modal-cancel-button">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default AddTaskModal;
