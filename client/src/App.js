import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

const API_URL = 'http://localhost:5000/api/bugs';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all bugs
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setBugs)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Add a new bug
  const addBug = (bug) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    })
      .then(res => res.json())
      .then(newBug => setBugs(bugs => [...bugs, newBug]))
      .catch(setError);
  };

  // Update a bug
  const updateBug = (id, updates) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then(res => res.json())
      .then(updatedBug => setBugs(bugs => bugs.map(b => b._id === id ? updatedBug : b)))
      .catch(setError);
  };

  // Delete a bug
  const deleteBug = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setBugs(bugs => bugs.filter(b => b._id !== id)))
      .catch(setError);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error.message || error.toString()}</div>;

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
        <h1>Bug Tracker</h1>
        <BugForm onSubmit={addBug} />
        <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
