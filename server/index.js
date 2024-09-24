const express = require('express');
const app = express();
const PORT = 3001;

let issues = [
    { id: 1, title: "First issue", description: "This is the first issue." },
    { id: 2, title: "Second issue", description: "This is the second issue." },
];

app.use(express.json());

// Read - GET
app.get('/issues', (req, res) => {
    res.json(issues);
});

// Create - POST
app.post('/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    console.log('Issue created:', newIssue);
    res.status(201).json(newIssue);
});

// Update - PUT
app.put('/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    issues = issues.map(issue => issue.id == id ? updatedIssue : issue);
    console.log('Issue updated:', updatedIssue);
    res.json(updatedIssue);
});

// Delete - DELETE
app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    issues = issues.filter(issue => issue.id != id);
    console.log('Issue deleted:', id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
