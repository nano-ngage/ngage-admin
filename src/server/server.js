import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import Promise form 'bluebird';

// Inferno Imports
import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import { RouterContext, match } from 'inferno-router';
import { createMemoryHistory } from 'history';
import createRoutes from '../shared/routes.jsx';

const app = express();

// Template Engine with handlebars
app.set('views', path.resolve('views'));
app.engine('hbs', handlebars({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve('views', 'layouts')
}));
app.set('view engine', 'hbs');

// Universal Routing with Inferno-Router
app.get('*', (req, res) => {
  const history = createMemoryHistory();
  const routes = createRoutes(history);

  match({routes: routes, location: req.location}, (err, redirLoc, rProps) => {
    if (redirLoc) {
      res.redirect(301, redirLoc.pathname + redirLoc.search);
    } else if (err) {
      res.send(500, err.message);
    } else if (rProps === null) {
      res.send(404, 'Not found')   // <-- later replace with 404 route/component
    } else {

      // TODO: Make all components into promises (the ones that do DB fetching)
      // Then once all of the data has loaded do res.render passing in:
      // - content (html from renderToString)
      // - context (the data from the DB) -- to be set on the Window initially
    }
  })
});

export default app;
