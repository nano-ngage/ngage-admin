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
    window.browserHistory.push('/');
  }

  render() {
    return null;
  }
}
