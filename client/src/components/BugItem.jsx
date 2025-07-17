import React from 'react';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdate(bug._id, { status: e.target.value });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
      <strong>{bug.title}</strong>
      <p>{bug.description}</p>
      <div>
        <label htmlFor={`status-${bug._id}`}>Status: </label>
        <select
          id={`status-${bug._id}`}
          value={bug.status}
          onChange={handleStatusChange}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <button onClick={() => onDelete(bug._id)} style={{ marginTop: 5 }}>Delete</button>
    </div>
  );
};

export default BugItem;
