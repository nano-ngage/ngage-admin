import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import { SESSION_SECRET } from '../../secrets.js';

// Use Redis as session storage
import redis from 'redis';
const redisStore = require('connect-redis')(session);
// const client = redis.createClient();

// Inferno Imports

const app = express();

// =====================================================
// Body Parser Middleware
// =====================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =====================================================
// Sessions, Cookies, and Redis
// =====================================================
app.use(cookieParser(SESSION_SECRET));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // store: new redisStore({
  //   host: 'localhost',
  //   port: 6379,
  //   client: client,
  //   ttl: 260
  // }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// =====================================================
// Static Files to serve
// =====================================================
app.use(express.static(path.join(__dirname, '../../', 'public')))


// =====================================================
// Send index.html with bundled script for client
// =====================================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'public', 'index.html'));
})

module.exports = app;
