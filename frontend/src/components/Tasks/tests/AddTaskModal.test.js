import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Tasks from '../Tasks';
import AddTaskModal from '../AddTaskModal';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

const renderAddTaskModal = (props) => {
  render(<AddTaskModal {...props} />);
};

const changeTaskNameAndSubmit = (taskName) => {
  fireEvent.change(screen.getByPlaceholderText('Enter Task'), { target: { value: taskName } });
  fireEvent.click(screen.getByTestId('modal-add-task-button'));
};

// Parameterized tests for invalid task names
test.each([
  ['', 'Task name cannot be empty.'],
  ['   ', 'Task name cannot be empty.'],
  ['a'.repeat(101), 'Task name cannot exceed 100 characters.']
])('shows error when the task name is "%s"', async (taskName, expectedError) => {
  const onAddTask = jest.fn();
  const onRequestClose = jest.fn();

  renderAddTaskModal({ isOpen: true, onAddTask, onRequestClose });

  changeTaskNameAndSubmit(taskName);

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent(expectedError);
  });
});

// Test for exactly 100 characters
test('accepts a task name with exactly 100 characters', async () => {
  const onAddTask = jest.fn();
  const onRequestClose = jest.fn();

  renderAddTaskModal({ isOpen: true, onAddTask, onRequestClose });

  const taskName = 'a'.repeat(100);
  changeTaskNameAndSubmit(taskName);

  await waitFor(() => {
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
  
  expect(onAddTask).toHaveBeenCalledWith(taskName);
});

test('adds a task when the Add Task button is clicked and the form is submitted', async () => {
  const newTask = { id: 3, name: 'New Task', checked: false };

  axios.get.mockResolvedValue({ data: { tasks: [] } });
  axios.post.mockResolvedValue({ data: { task: newTask } });

  renderWithRouter(<Tasks />);

  fireEvent.click(screen.getByTestId('open-add-task-modal-button'));
  fireEvent.change(screen.getByPlaceholderText('Enter Task'), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByTestId('modal-add-task-button'));

  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
