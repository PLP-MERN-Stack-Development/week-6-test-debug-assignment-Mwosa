import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugItem from '../BugItem';

describe('BugItem', () => {
  const bug = { _id: '1', title: 'Bug 1', description: 'Desc', status: 'open' };

  it('renders bug info', () => {
    render(<BugItem bug={bug} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('calls onUpdate when status changes', () => {
    const onUpdate = jest.fn();
    render(<BugItem bug={bug} onUpdate={onUpdate} onDelete={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'resolved' } });
    expect(onUpdate).toHaveBeenCalledWith('1', { status: 'resolved' });
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    render(<BugItem bug={bug} onUpdate={jest.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
}); 