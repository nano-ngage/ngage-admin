import Inferno from 'inferno';
import Component from 'inferno-component';

import Nav from './common/Nav.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.handleUser = this.handleUser.bind(this);
  }

  handleUser(user) {
    this.setState({
      user: user
    })
  }

  render() {
    // This is how you pass down props to children using Inferno Router
    const childWithProps = Inferno.cloneVNode(this.props.children, {
      handleUser: this.handleUser,
      user: this.state.user
    });
    return (
      <div id="app">
        <h1>ngage</h1>
        <hr />
        <Nav user={this.state.user}/>
        {childWithProps}
      </div>
    );
  }
}
