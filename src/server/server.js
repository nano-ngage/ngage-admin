import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

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

// =====================================================
// Static Files to serve
// =====================================================
app.use(express.static(path.resolve(__dirname, 'public')))


// =====================================================
// Send index.html with bundled script for client
// =====================================================
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

module.exports = app;
