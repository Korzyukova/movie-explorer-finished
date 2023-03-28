const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

require('dotenv').config();

const routes = require('./routes');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, NotFoundError404 } = require('./middlewares/errorHandlers');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(requestLogger);
app.use('/api', routes);
app.all('*', auth, () => {
  throw new NotFoundError404('Not found.');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/bitfilmsdb';
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
