import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Tasks from './Tasks';

jest.mock('axios');

test('renders tasks fetched from API', async () => {
  const tasks = [
    { id: 1, name: 'Test Task 1', checked: false },
    { id: 2, name: 'Test Task 2', checked: true }
  ];
  axios.get.mockResolvedValue({ data: { tasks } });

  render(<Tasks />);

  expect(await screen.findByText('Test Task 1 - Incomplete')).toBeInTheDocument();
  expect(await screen.findByText('Test Task 2 - Completed')).toBeInTheDocument();
});
