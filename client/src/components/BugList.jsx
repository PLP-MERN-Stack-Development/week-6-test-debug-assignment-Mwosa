import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, onUpdate, onDelete }) => (
  <div>
    <h2>All Bugs</h2>
    {bugs.length === 0 ? (
      <p>No bugs reported.</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bugs.map(bug => (
          <li key={bug._id} style={{ marginBottom: 10 }}>
            <BugItem bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default BugList;
