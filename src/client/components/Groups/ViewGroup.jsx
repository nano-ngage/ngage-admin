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
          <span className="title">{this.props.group.name}</span>
            <span className="actions">
            <Link to={"/editgroup/" + this.props.group.groupID + '/' + this.props.group.name} className="action">Edit</Link>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.group.groupID)}}>Delete</span></span>
        </div>
      </div>
    );
  }
}

export default ViewGroup;
