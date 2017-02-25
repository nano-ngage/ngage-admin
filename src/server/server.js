import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import path from 'path';
import Promise from 'bluebird';

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
// Sessions, Cookies, and Redis
// =====================================================
app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
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