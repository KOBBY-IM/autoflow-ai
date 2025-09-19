const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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
  };

  return res.json(response);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
