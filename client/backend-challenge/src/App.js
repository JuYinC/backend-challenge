import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });

  // Fetch issues from the server (Read)
  useEffect(() => {
    fetch('/issues')  // This should hit your backend server's /issues endpoint
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.error("Error fetching issues:", err));
  }, []);

  // Create new issue
  const createIssue = () => {
    fetch('/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    })
      .then(res => res.json())
      .then(createdIssue => {
        setIssues([...issues, createdIssue]);
        setNewIssue({ id: '', title: '', description: '' });
      })
      .catch(err => console.error("Error creating issue:", err));
  };

  // Delete issue
  const deleteIssue = (id) => {
    fetch(`/issues/${id}`, { method: 'DELETE' })
      .then(() => setIssues(issues.filter(issue => issue.id !== id)))
      .catch(err => console.error("Error deleting issue:", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Issue Tracker</h1>

        {/* Display Issues */}
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
              <strong>{issue.title}</strong>: {issue.description}
              <button onClick={() => deleteIssue(issue.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Form to Create New Issue */}
        <h2>Create New Issue</h2>
        <input
          type="text"
          placeholder="ID"
          value={newIssue.id}
          onChange={e => setNewIssue({ ...newIssue, id: e.target.value })}
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
        <button onClick={createIssue}>Create Issue</button>
      </header>
    </div>
  );
}

export default App;
