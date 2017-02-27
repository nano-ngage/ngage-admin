import Inferno from 'inferno';
import createRouter from './components/Router.jsx';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

Inferno.render(createRouter(browserHistory), document.getElementById('app'));
