import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tasks from '../Tasks';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

test('renders tasks retrieved from API', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  expect(screen.getByText('Test Task 2')).toBeInTheDocument();
});

test('displays error message when API call fails', async () => {
  axios.get.mockRejectedValue(new Error('There was an error retrieving the tasks!'));

  render(<Tasks />);

  await waitFor(() => {
    expect(screen.getByText('There was an error retrieving the tasks!')).toBeInTheDocument();
  });
});

test('adds a task when the Add Task button is clicked and the form is submitted', async () => {
  const newTask = { id: 3, name: 'New Task', checked: false };
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });
  axios.post.mockResolvedValue({ data: { task: newTask } });

  render(<Tasks />);
  
  fireEvent.click(screen.getByTestId('open-add-task-modal-button'));
  fireEvent.change(screen.getByPlaceholderText('Enter Task'), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByTestId('modal-add-task-button'));

  expect(await screen.findByText('New Task')).toBeInTheDocument();
});
