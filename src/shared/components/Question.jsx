import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Question extends Component {
  render() {
    const data = this.props.data;

    return (
      <div>
        <h4>{data.title}</h4>
        <p>{data.body}</p>
      </div>
    );
  }
}
