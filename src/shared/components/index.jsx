import Inferno from 'inferno';
import Component from 'inferno-component';
import Nav from './Nav.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0
    };
  }

  componentDidMount() {
    //  FETCH USER INFORMATION
    // fetch('/item-names').then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  render() {
    return (
      <div  id="app">
      <Nav />
      {this.props.children}
      </div>
    );
  }
}
