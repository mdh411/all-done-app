import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-modal', () => {
  const MockModal = ({ children, ...props }) => {
    const { isOpen, overlayClassName, contentLabel, onRequestClose, ...rest } = props;
    return <div {...rest}>{children}</div>;
  };
  MockModal.setAppElement = jest.fn();
  return MockModal;
});
