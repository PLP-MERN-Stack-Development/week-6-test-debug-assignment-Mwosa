import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
    if (options && options.method === 'POST') {
      return Promise.resolve({
        json: () => Promise.resolve({ _id: '2', title: 'Bug 2', description: 'Desc', status: 'open' })
      });
    }
    // GET
    return Promise.resolve({
      json: () => Promise.resolve([
        { _id: '1', title: 'Bug 1', description: 'Desc', status: 'open' }
      ])
    });
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('renders and adds a bug', async () => {
  render(<App />);
  expect(await screen.findByText('Bug 1')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Bug 2' } });
  fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Desc' } });
  fireEvent.click(screen.getByText(/submit bug/i));
  await waitFor(() => expect(screen.getByText('Bug 2')).toBeInTheDocument());
});
