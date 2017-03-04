import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';

class ViewGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="viewPpt">
          <span className="title">{this.props.ppt.title}</span>
            <span className="actions"><span className="action" onClick={() => {this.props.start(this.props.ppt.presentationID)}}>Start</span>&nbsp;|&nbsp;
            <Link to={"/edit/" + this.props.ppt.presentationID + '/' + this.props.ppt.title} className="action">Edit</Link>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.ppt.presentationID)}}>Delete</span></span>
        </div>
      </div>
    );
  }
}

export default ViewGroup;
