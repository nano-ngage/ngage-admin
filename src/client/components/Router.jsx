import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';

// Import Components Here
import App from './App.jsx';
import Home from './Home.jsx';
import Login from './Auth/Login.jsx';
import Logout from './Auth/Logout.jsx';

import ViewPresentations from './ViewPresentations/ViewPresentations.jsx';
import CreatePresentation from './CreatePresentation/CreatePresentation.jsx';
import EditPresentation from './CreatePresentation/EditPresentation.jsx';
import ViewGroups from './Groups/ViewGroups.jsx';
import CreateGroup from './Groups/CreateGroup.jsx';
import EditGroup from './Groups/EditGroup.jsx';
import Statistics from './Stats/Stats.jsx';

var dbURL = 'http://104.131.147.199:5000';

function getPpts(userID) {
  return fetch(dbURL + '/pByU/'+ userID,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function authOnly({props}) {
  if (!props.user) {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.browserHistory.push('/login');
    } else {
      props.handleUser(user);
    }
  }
}

export default (history) => (
  <Router history={history}>
    <Route path="/" component={ App } >
      <IndexRoute component={ Home } />
      <Route path="edit/:id/:title" component={ EditPresentation } onEnter={authOnly} />
      <Route path="create" component={ CreatePresentation } onEnter={authOnly} />
      <Route path="presentations" component={ ViewPresentations } onEnter={authOnly} />
      <Route path="groups" component={ ViewGroups } onEnter={authOnly} />
      <Route path="creategroup" component={ CreateGroup } onEnter={authOnly} />
      <Route path="editgroup/:id/:name" component={ EditGroup } onEnter={authOnly} />
      <Route path="statistics" component={ Statistics } onEnter={authOnly} />
      <Route path="login" component={ Login } />
      <Route path="logout" component={ Logout } />
    </Route>
  </Router>
)
