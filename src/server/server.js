import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import Promise from 'bluebird';

// Inferno Imports
import Inferno from 'inferno';
import { match } from 'inferno-router';
import routes from '../shared/routes.jsx';
import { extractComponents, mapComponentsToPromises, prepareData, render } from './lib/helpers';

const app = express();

// Template Engine with handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');

const router = express.Router();

// Static Assets Here -- NOTE: Express Static doesn't work for this
router.get('/dist/*', function (req, res){
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
    .then((values) => {
      const data = prepareData(values, components);
      const html = render(renderProps, data);
      //Add environment variables for deployment
      data.DBIP = process.env.DBIP || 'localhost';
      data.DBPORT = process.env.DBPORT || '5000';
      res.render('index', {
        content: html,
        context: JSON.stringify(data)
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.use(router);

app.listen(3001, () => {
  console.log('Listening on port 3001');
});

module.exports = app;