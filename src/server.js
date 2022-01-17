const express = require('express');
const setupMiddlewares = require('./middlewares');
const { PORT } = require('./config/index');

const app = express();
setupMiddlewares(app);

app.get('/api/ping', (request, response) => {
  response.json({ ping: 'pong' });
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
