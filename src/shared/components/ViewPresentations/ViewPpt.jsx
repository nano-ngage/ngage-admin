import Inferno from 'inferno';
import Component from 'inferno-component';

class ViewPpt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="viewPpt">
          <span className="title">{this.props.ppt.title}</span>
            <span className="actions"><span className="action">Start</span>&nbsp;|&nbsp;
            <span className="action">Edit</span>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.ppt.presentationID)}}>Delete</span></span>
        </div>
      </div>
    );
  }
}

export default ViewPpt;
