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

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
