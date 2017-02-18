import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';

// Import Components Here
import App from './containers/index.jsx';
import Home from './components/Home.jsx';

export default history => (
  <Router history={history}>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
    </Route>
  </Router>
)
