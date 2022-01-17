const express = require('express');
const setupMiddlewares = require('./middlewares');
const { PORT } = require('./config/index');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const categoriesRouter = require('./routes/categories')
const commentsRouter = require('./routes/comments')

const app = express();
setupMiddlewares(app);

app.get('/api/ping', (request, response) => {
  response.json({ ping: 'pong' });
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
