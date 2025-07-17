import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

describe('BugForm', () => {
  it('renders form fields', () => {
    render(<BugForm onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/submit bug/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data', () => {
    const onSubmit = jest.fn();
    render(<BugForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Bug 1' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByText(/submit bug/i));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bug 1', description: 'Desc' });
  });

  it('does not submit if title is empty', () => {
    const onSubmit = jest.fn();
    render(<BugForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/submit bug/i));
    expect(onSubmit).not.toHaveBeenCalled();
  });
}); 