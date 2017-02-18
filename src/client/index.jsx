// Inferno & Routes
import Inferno from 'inferno';
import { createBrowserHistory } from 'history';
import createRoutes from '../shared/routes.jsx';

const history = createBrowserHistory();

Inferno.render(createRoutes(history), document.getElementById('inferno-view'));
