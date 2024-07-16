import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tasks from '../Tasks';

jest.mock('axios');

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

test('deletes a task when the delete button is clicked', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });
  axios.delete.mockResolvedValue({});

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('delete-button-1'));
  await waitFor(() => {
    expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
  });
});

test('toggles task completion state when the checkbox is clicked', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });
  axios.put.mockResolvedValue({ data: { task: { ...tasks[0], checked: true } } });

  render(<Tasks />);

  const task1 = await screen.findByText('Test Task 1');
  const checkbox = screen.getByTestId('complete-checkbox-1');

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/tasks/1', { checked: true });
  });
});

test('handles API error when toggling task completion state', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });
  axios.put.mockRejectedValue(new Error('There was an error updating the task!'));

  render(<Tasks />);

  const task1 = await screen.findByText('Test Task 1');
  const checkbox = screen.getByTestId('complete-checkbox-1');

  fireEvent.click(checkbox);

  expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/tasks/1', { checked: true });
});
