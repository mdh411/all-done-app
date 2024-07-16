import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Tasks from './components/Tasks/Tasks';

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
