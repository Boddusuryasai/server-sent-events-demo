const express = require('express');
const app = express();
const port = 4001;


let stream = 0;
const updateSteam = () => {
  const number = Math.random();
  stream += number;
};

app.get('/stream', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Type', 'text/event-stream');

  const sendEvent = () => {
    const streamdata = JSON.stringify({stream: stream });
    res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${streamdata}\n\n`);
  };

  const intervalId = setInterval(sendEvent, 1000);

  res.on('close', () => {
    clearInterval(intervalId);
  });
});

app.use((req, res) => {
  res.status(404).send('Resource does not exist');
});

 app.listen(port, () => {
  setInterval(updateSteam, 500);
  console.log(`Server running at http://localhost:${port}`);
});
