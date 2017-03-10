import Inferno from 'inferno';
import createRouter from './components/Router.jsx';
import { createBrowserHistory } from 'history';
import 'whatwg-fetch';
const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

import css from './css/main.css';

Inferno.render(createRouter(browserHistory), document.getElementById('app'));
