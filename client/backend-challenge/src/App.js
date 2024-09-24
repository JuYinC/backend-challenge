import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });
  const [isUpdating, setIsUpdating] = useState(false);  // State to track if we're updating
  const [currentIssueId, setCurrentIssueId] = useState(null); // Track which issue is being updated

  // Fetch issues from the server (Read)
  useEffect(() => {
    fetch('/issues')
      .then(res => res.json())
      .then(data => setIssues(data));
  }, []);

  // Create issue
  const createIssue = () => {
    fetch('/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(() => {
      setIssues([...issues, newIssue]);
      setNewIssue({ id: '', title: '', description: '' });
    });
  };

  // Update issue
  const updateIssue = () => {
    fetch(`/issues/${currentIssueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(() => {
      setIssues(
        issues.map(issue => (issue.id === currentIssueId ? newIssue : issue))
      );
      setNewIssue({ id: '', title: '', description: '' });
      setIsUpdating(false);
      setCurrentIssueId(null);
    });
  };

  // Set the issue to be updated
  const setUpdateIssue = (issue) => {
    setNewIssue(issue);
    setIsUpdating(true);
    setCurrentIssueId(issue.id);
  };

  // Delete issue
  const deleteIssue = (id) => {
    fetch(`/issues/${id}`, { method: 'DELETE' })
      .then(() => setIssues(issues.filter(issue => issue.id !== id)));
  };

  return (
    <div>
      <h1>Issue Tracker</h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            {issue.title}: {issue.description}
            <button onClick={() => deleteIssue(issue.id)}>Delete</button>
            <button onClick={() => setUpdateIssue(issue)}>Edit</button> {/* Edit button */}
          </li>
        ))}
      </ul>

      <h2>{isUpdating ? 'Update Issue' : 'Create Issue'}</h2>
      <input
        type="text"
        placeholder="ID"
        value={newIssue.id}
        onChange={e => setNewIssue({ ...newIssue, id: e.target.value })}
        disabled={isUpdating}  // Disable the ID input when updating
      />
      <input
        type="text"
        placeholder="Title"
        value={newIssue.title}
        onChange={e => setNewIssue({ ...newIssue, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newIssue.description}
        onChange={e => setNewIssue({ ...newIssue, description: e.target.value })}
      />
      <button onClick={isUpdating ? updateIssue : createIssue}>
        {isUpdating ? 'Update Issue' : 'Create Issue'}
      </button>
    </div>
  );
};

export default App;
