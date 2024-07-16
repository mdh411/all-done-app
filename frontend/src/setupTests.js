import '@testing-library/jest-dom';
import React from 'react';
import Modal from 'react-modal';

jest.mock('react-modal', () => {
  const MockModal = ({ children, ...props }) => {
    const { isOpen, onRequestClose, contentLabel, ...rest } = props;
    return <div {...rest}>{children}</div>;
  };
  MockModal.setAppElement = jest.fn();
  return MockModal;
});
