import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';

class ViewPpt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="viewPpt">
          <span className="title">PID: {this.props.ppt.presentationID} (todo: change to title)</span>
            <span className="actions"><span className="action">Start</span>&nbsp;|&nbsp;
            <Link to={"/create/" + this.props.ppt.presentationID} className="action">Edit</Link>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.ppt.presentationID)}}>Delete</span></span>
        </div>
      </div>
    );
  }
}

export default ViewPpt;
