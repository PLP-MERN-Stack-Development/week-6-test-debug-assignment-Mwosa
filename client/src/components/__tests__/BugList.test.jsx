import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from '../BugList';

describe('BugList', () => {
  it('shows message when no bugs', () => {
    render(<BugList bugs={[]} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/no bugs reported/i)).toBeInTheDocument();
  });

  it('renders a list of bugs', () => {
    const bugs = [
      { _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'open' },
      { _id: '2', title: 'Bug 2', description: 'Desc 2', status: 'resolved' },
    ];
    render(<BugList bugs={bugs} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });
}); 