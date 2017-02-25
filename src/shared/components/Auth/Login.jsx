import Inferno from 'inferno';
import Component from 'inferno-component';
import AuthService from './AuthService.jsx';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../../../../secrets.js';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, this.handleLogin.bind(this))
    }
  }

  handleLogin(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.props.handleUser(user)

    // Setting up this reference so it can be used in
    // different "this" context below
    const handleUser = this.props.handleUser;

    // This fetch request is for the purpose of validating
    // a user login in the event someone tries to do a direct
    // post request to our /initsession with fake auth_id & user_id
    // (there's no way to get a specific users's user_id from our DB)
    fetch('http://127.0.0.1:3001/initsession', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(verifiedUser => {
      handleUser(verifiedUser);
    })
    .catch(err => { console.error('oops, something went wrong', err); });

  }

  componentDidMount() {
    this.state.auth.login();
  }

  render() {
    return null;
  }
}
