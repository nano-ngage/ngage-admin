import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Logout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Delete local storage files of user, id_token, and profile
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('profile');
    this.props.handleUser(null);

    // Post request to kill the session
    fetch('http://127.0.0.1:3001/logout', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      body: JSON.stringify({})
    })
    .then(res => res.text())
    .then(text => {
      browserHistory.push('/')
    })
    .catch(err => { console.error(err); })
  }

  render() {
    return null;
  }
}
