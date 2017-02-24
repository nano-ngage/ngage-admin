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

// This is needed to prevent server-side rendering
// (inferno-server renderToString) from breaking;
// tldr: renderToString does not like references to the window objects
function isClient() {
  return typeof window !== 'undefined' && window.document;
}

function authOnly({props, router}) {
  if (isClient()) {                             // use localStorage instead of
    if (!window.localStorage.getItem('user')) { // sessions to handle when a
      router.push('/login')                     // user navigates directly to
    }                                           // /create or /view after already
    if (!props.user) {                          // logging in on client side
      props.handleUser(JSON.parse(window.localStorage.getItem('user')))
    }
  }
}

export default (
  <Route path="/" component={ App } >
    <IndexRoute component={ Home } />
    <Route path="edit/:id/:title" component={ EditPresentation } />
    <Route path="create" component={ CreatePresentation } onEnter={authOnly} />
    <Route path="view" component={ ViewPresentations } onEnter={authOnly} />
    <Route path="login" component={ Login } />
    <Route path="logout" component={ Logout } />
  </Route>
)
