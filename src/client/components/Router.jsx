import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';

// Import Components Here
import App from './components/index.jsx';
import Home from './components/Home.jsx';
import Login from './components/Auth/Login.jsx';
import Logout from './components/Auth/Logout.jsx';

import CreatePresentation from './components/CreatePresentation/CreatePresentation.jsx';
import EditPresentation from './components/CreatePresentation/EditPresentation.jsx';
import ViewPresentations from './components/ViewPresentations/ViewPresentations.jsx';

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
