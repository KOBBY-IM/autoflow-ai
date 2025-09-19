const express = require('express');
const cors = require('cors');
const path = require('path');
const { default: open } = require('open');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.post('/suggest-flow', (req, res) => {
  const { prompt } = req.body || {};

  if (typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid input: prompt must be a string' });
  }

  const response = {
    steps: [
      'Trigger: Slack message received',
      'Action: Append to Google Sheets',
      'Action: Summarize with AI',
      'Action: Store in Notion',
    ],
    explanation:
      'Workflow connects Slack → Sheets, summarizes messages, stores in Notion.',
    analytics: {
      successRate: "98%",
      avgExecutionTime: "1.2s",
      recommendation: "Replace manual trigger with a webhook to reduce delays."
    }
  };

  return res.json(response);
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  // Auto-open the application in the default browser
  open(`http://localhost:${PORT}`);
});
