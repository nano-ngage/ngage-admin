import propTypes from 'proptypes';
import Inferno from 'inferno';
import Component from 'inferno-component';

Inferno.PropTypes = propTypes;

export default class ContextWrapper extends Component {
  static get childContextTypes() {
    return {
      data: Inferno.PropTypes.object
    }
  }

  getChildContext() {
    return {
      data: this.props.data
    }
  }

  render() {
    return this.props.children;
  }
}
