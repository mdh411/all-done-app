import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tasks from '../Tasks';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

const tasks = [
  { id: 1, name: 'Test Task 1', checked: false },
  { id: 2, name: 'Test Task 2', checked: true }
];

// helper functions for reusability
const renderTasksComponent = async () => {
  axios.get.mockResolvedValue({ data: { tasks } });
  render(<Tasks />);
  await screen.findByText('Test Task 1');
};

const openEditModalAndSubmit = (newTaskName) => {
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: newTaskName } });
  fireEvent.click(screen.getByTestId('modal-edit-task-button'));
};

const openEditModalAndCancel = (newTaskName) => {
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: newTaskName } });
  fireEvent.click(screen.getByTestId('edit-modal-cancel-button'));
};

test('edits a task when the Edit Task button is clicked and the form is submitted', async () => {
  const updatedTask = { ...tasks[0], name: 'Updated Task' };

  axios.put.mockResolvedValue({ data: { task: updatedTask } });

  await renderTasksComponent();

  openEditModalAndSubmit('Updated Task');

  await waitFor(() => {
    expect(screen.getByText('Updated Task')).toBeInTheDocument();
  });
});

// paramaterised test to avoid repetiton
test.each([
    ['', 'Task name cannot be empty.'],
    ['   ', 'Task name cannot be empty.'],
    ['a'.repeat(101), 'Task name cannot exceed 100 characters.']
  ])('shows error when the task name is "%s"', async (taskName, expectedError) => {
    await renderTasksComponent();
  
    openEditModalAndSubmit(taskName);
  
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(expectedError);
    });
  });

test('accepts a task name with exactly 100 characters', async () => {
    const tasks = [
      { id: 1, name: 'Test Task 1', checked: false },
      { id: 2, name: 'Test Task 2', checked: true }
    ];
  
    axios.get.mockResolvedValue({ data: { tasks } });
    axios.put.mockResolvedValue({ data: { task: { ...tasks[0], name: 'a'.repeat(100) } } });
  
    render(<Tasks />);
  
    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('edit-button-1'));
    fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: 'a'.repeat(100) } });
    fireEvent.click(screen.getByTestId('modal-edit-task-button'));
  
    await waitFor(() => {
      expect(screen.getByText('a'.repeat(100))).toBeInTheDocument();
    });
  });

test('cancels the edit task action', async () => {
  await renderTasksComponent();

  openEditModalAndCancel('Updated Task');

  await waitFor(() => {
    expect(screen.queryByText('Updated Task')).not.toBeInTheDocument();
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  });
});
