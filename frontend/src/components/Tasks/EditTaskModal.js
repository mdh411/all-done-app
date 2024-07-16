import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './EditTaskModal.css';

Modal.setAppElement('#root');

const EditTaskModal = ({ isOpen, onRequestClose, onEditTask, task }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [error, setError] = useState('');

  useEffect(() => {
    setTaskName(task.name);
  }, [task]);

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
    onEditTask(task.id, taskName);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="modal"
      overlayClassName="overlay"
    >
      <button className="close-button" onClick={onRequestClose}>&times;</button>
      <h2>Edit Task</h2>
      {error && <div data-testid="error-message" className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Updated Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit" data-testid="modal-edit-task-button">Edit Task</button>
        <button type="button" onClick={onRequestClose} data-testid="modal-cancel-button">Cancel</button>
      </form>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EditTaskModal;
