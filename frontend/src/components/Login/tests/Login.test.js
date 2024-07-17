import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('login with invalid credentials', async () => {
  axios.post.mockRejectedValue(new Error('Invalid email or password'));

  renderWithRouter(<Login />);

  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByTestId('login-button'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
  });
});

test('login with valid credentials', async () => {
  axios.post.mockResolvedValue({ data: { access_token: 'valid_token' } });

  renderWithRouter(<Login />);

  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByTestId('login-button'));

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('valid_token');
  });
});
