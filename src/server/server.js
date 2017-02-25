import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fetch from 'fetch-everywhere';
import path from 'path';
import querystring from 'querystring';
import decode from 'jwt-decode';
import Promise from 'bluebird';

// Secret info
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, SESSION_SECRET } from '../../secrets.js';

// Use Redis as session storage
import redis from 'redis';
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

// Inferno Imports
import Inferno from 'inferno';
import { match } from 'inferno-router';
import routes from '../shared/routes.jsx';
import { extractComponents, mapComponentsToPromises, prepareData, render } from './lib/helpers';

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
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client: client,
    ttl: 260
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));

// =====================================================
// Templating Enging with Handlebars
// =====================================================
const hbs = exphbs.create({
  helpers: {
    json: context => JSON.stringify(context)
  },
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// =====================================================
// Routing
// =====================================================
const router = express.Router();

// Static Assets -- NOTE: Express Static doesn't work for this
router.get('/dist/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../', req.url));
})

// Endpoint for Login.jsx to get the user
router.post('/initsession', (req, res) => {
  const auth_id = req.body.authID;
  const user_id = req.body.userID;
  fetch('http://104.131.147.199:5000/login', {
           method: 'POST',
           headers: {"Content-Type": "application/json"},
           mode: 'cors',
           body: JSON.stringify({
             auth_id: auth_id
           })
        })
    .then(response => response.json())
    .then(user => {
      res.send(user);
    })
    .catch(err => console.error('Not a valid user', err));

});

// Endpoint for client-side Logout.jsx to kill the session
router.post('/logout', (req, res) => {
  req.session = undefined;
  res.send('logged out!');
})

// Edgecase: if a user navigates directly to /logout in the searchbar
// it won't actually log the user out (just redirect to / for now)
// TODO: Need to find a way to delete localStorage items (user, id_token, profile)
// when navigting here to truly log out
router.get('/logout', (req, res) => {
  res.redirect('/');
});

// This is the endpoint that the Auth0 middleware (defined below)
// will redirect to with necessary params (code & state)
// to finish the server-side Auth0 authentication flow
router.get('/login', (req, res) => {

  const queryParams = querystring.parse(req.url.split('?')[1]);;
  const code = queryParams.code;

  fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      body: JSON.stringify({
        "grant_type": "authorization_code",
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "code": code,
        "redirect_uri": "http://127.0.0.1:3001/login"
      }),
      json: true
    })
    .then(response => response.json())
    .then(token => {
      const decoded = decode(JSON.stringify(token))
      const profile = {
        auth_id: decoded.sub,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        type: 0
      };
      // store id_token & profile for later use in server-side rendering
      req.session.id_token = token.id_token;
      req.session.profile = profile;
      return fetch('http://104.131.147.199:5000/login', {
               method: 'POST',
               headers: {"Content-Type": "application/json"},
               mode: 'cors',
               body: JSON.stringify(profile)
             })
             .then(response => response.json())
             .catch(err => { console.error(err); })
    })
    .then(user => {
      // storing user for later use in server-side rendering
      req.session.key = user;
      res.redirect('/')
    })
    .catch(err => console.error(err))
});

// Authentication Auth0 Middleware
// This gets applied to all other routes except for homepage & initsession
router.use((req, res, next) => {
  if (req.url === '/' || req.url === '/initsession' || req.session) {
    next();
  } else {
    const url = `https://${AUTH0_DOMAIN}/authorize` +
                '?response_type=code' + `&client_id=${AUTH0_CLIENT_ID}` +
                '&scope=openid%20given_name%20family_name%20email';
    fetch(url)
      .then(response => response.text())
      .then(html => res.send(html))
      .catch(err => { console.error(err); });
  }
})

// Universal Routing with Inferno-Router
router.get('*', (req, res) => {
  const renderProps = match(routes, req.originalUrl)
  if (renderProps.redirect) {
    return res.redirect(renderProps.redirect);
  }

  const unfilteredComponents = extractComponents(renderProps.matched.props);
  const { promises, components } = mapComponentsToPromises(unfilteredComponents, renderProps.matched.params);

  Promise.all(promises)
    .then(values => {
      const data = prepareData(values, components);
      const html = render(renderProps, data);
      //Add environment variables for deployment
      data.DBIP = process.env.DBIP || 'localhost';
      data.DBPORT = process.env.DBPORT || '5000';
      res.render('index', {
        content: html,
        context: JSON.stringify(data),
        id_token: JSON.stringify(req.session.id_token),
        profile: JSON.stringify(req.session.profile),
        user: JSON.stringify(req.session.key)
      });

      req.session.id_token = undefined;
      req.session.profile = undefined;
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.use(router);

app.listen(3001, () => {
  console.log('Listening on port 3001');
});

module.exports = app;