import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';

// Import Components Here
import App from './App.jsx';
import Home from './Home.jsx';
import Login from './Auth/Login.jsx';
import Logout from './Auth/Logout.jsx';

import CreatePresentation from './CreatePresentation/CreatePresentation.jsx';
import EditPresentation from './CreatePresentation/EditPresentation.jsx';
import ViewPresentations from './ViewPresentations/ViewPresentations.jsx';

function authOnly() {
  if (!window.localStorage.getItem('user')) {
    window.browserHistory.push('/login')
  }
}

export default (history) => (
  <Router history={history}>
    <Route path="/" component={ App } >
      <IndexRoute component={ Home } />
      <Route path="edit/:id/:title" component={ EditPresentation } onEnter={authOnly} />
      <Route path="create" component={ CreatePresentation } onEnter={authOnly} />
      <Route path="view" component={ ViewPresentations } onEnter={authOnly} />
      <Route path="login" component={ Login } />
      <Route path="logout" component={ Logout } />
    </Route>
  </Router>
)
