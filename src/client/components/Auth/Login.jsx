import Inferno from 'inferno';
import Component from 'inferno-component';
import AuthService from './AuthService.jsx';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../../../secrets.js';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, this.props.handleUser)
    }
  }

  componentDidMount() {
    if (!this.state.auth.loggedIn()) {
      this.state.auth.show();
    } else {
      window.browserHistory.push('/');
    }
  }

  render() {
    return null;
  }
}
