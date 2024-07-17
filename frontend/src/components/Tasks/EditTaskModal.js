import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './TaskModal.css';

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
    setError('');
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
      <h2>Edit Task</h2>
      {error && <div className="error-message" data-testid="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Updated Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          data-testid="task-input"
        />
        <div className="modal-buttons">
          <button type="submit" data-testid="modal-edit-task-button">Edit Task</button>
          <button type="button" onClick={onRequestClose} className="cancel-button" data-testid="edit-modal-cancel-button">Cancel</button>
        </div>
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
