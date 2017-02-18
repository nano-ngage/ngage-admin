import Inferno from 'inferno';
import Component from 'inferno-component';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <h1>ngage</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
