// Inferno & Routes
import Inferno from 'inferno';
import { Router } from 'inferno-router';
import { createBrowserHistory } from 'history';
import routes from '../shared/routes.jsx';

import ContextWrapper from '../shared/components/common/ContextWrapper.jsx';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

Inferno.render((
  <ContextWrapper data={window.APP_STATE || {}}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ContextWrapper>
), document.getElementById('inferno-view'));
