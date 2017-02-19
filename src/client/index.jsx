// Inferno & Routes
import Inferno from 'inferno';
import { Router } from 'inferno-router';
import { createBrowserHistory } from 'history';
import routes from '../shared/routes.jsx';

const history = createBrowserHistory();

Inferno.render((
  <ContextWrapper data={window.APP_STATE || {}}>
    <Router history={history}>
      {routes}
    </Router>
  </ContextWrapper>
), document.getElementById('inferno-view'));
