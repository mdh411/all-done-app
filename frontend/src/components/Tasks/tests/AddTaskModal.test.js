import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tasks from '../Tasks';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

test('adds a task when the Add Task button is clicked and the form is submitted', async () => {
  const newTask = { id: 3, name: 'New Task', checked: false };

  axios.get.mockResolvedValue({ data: { tasks: [] } });
    axios.post.mockResolvedValue({ data: { task: newTask } });

  render(<Tasks />);

  // Open the add task modal
  fireEvent.click(screen.getByTestId('open-add-task-modal-button'));
  fireEvent.change(screen.getByPlaceholderText('Enter Task'), { target: { value: 'New Task' } });

  // Submit the form
  fireEvent.click(screen.getByTestId('modal-add-task-button'));

  // Verify the new task is displayed
  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
