import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tasks from '../Tasks';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

test('edits a task when the Edit Task button is clicked and the form is submitted', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  const updatedTask = { ...tasks[0], name: 'Updated Task' };

  axios.get.mockResolvedValue({ data: { tasks } });
  axios.put.mockResolvedValue({ data: { task: updatedTask } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: 'Updated Task' } });
  fireEvent.click(screen.getByTestId('modal-edit-task-button'));

  await waitFor(() => {
    expect(screen.getByText('Updated Task')).toBeInTheDocument();
  });
});

test('shows error when the task name is empty', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];

  axios.get.mockResolvedValue({ data: { tasks } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: '' } });
  fireEvent.click(screen.getByTestId('modal-edit-task-button'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent('Task name cannot be empty.');
  });
});

test('shows error when the task name exceeds 100 characters', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];

  axios.get.mockResolvedValue({ data: { tasks } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: 'a'.repeat(101) } });
  fireEvent.click(screen.getByTestId('modal-edit-task-button'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent('Task name cannot exceed 100 characters.');
  });
});

test('cancels the edit task action', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];

  axios.get.mockResolvedValue({ data: { tasks } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('edit-button-1'));
  fireEvent.change(screen.getByPlaceholderText('Enter Updated Task'), { target: { value: 'Updated Task' } });
  fireEvent.click(screen.getByTestId('modal-cancel-button'));

  await waitFor(() => {
    expect(screen.queryByText('Updated Task')).not.toBeInTheDocument();
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  });
});
