import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';

// Import Components Here
import App from './components/index.jsx';
import Home from './components/Home.jsx';

import CreatePresentation from './components/CreatePresentation/CreatePresentation.jsx';
import EditPresentation from './components/CreatePresentation/EditPresentation.jsx';
import ViewPresentations from './components/ViewPresentations/ViewPresentations.jsx';


export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="create" component={ CreatePresentation } />
    <Route path="view" component={ ViewPresentations } />
    <Route path="edit/:id" component={ EditPresentation } />
  </Route>
)
