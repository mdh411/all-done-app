import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders the create task form', () => {
  const { getByPlaceholderText } = render(<App />);
  const inputElement = getByPlaceholderText(/New task/i);
  expect(inputElement).toBeInTheDocument();
});

test('allows users to add a task', async () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<App />);
  const inputElement = getByPlaceholderText(/New task/i);
  const buttonElement = getByRole('button', { name: /Add Task/i });

  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(getByText('New Task')).toBeInTheDocument();
  });
});