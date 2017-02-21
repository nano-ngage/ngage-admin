import Inferno from 'inferno';
import Component from 'inferno-component';

class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationID: this.props.presentationID,
      type: 4,
      questionID: 0,
      question: ''
    };
  }

  componentDidMount() {
    //  fetch question ID
    //  put request to update ID
    // myAPI.fetch('/item-names').then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  // function to edit questions --> changes qid in the add new question box

  render() {
    return (
      <div className="viewQuestion">
          <span className="title">{this.props.question.question}</span>
          <span className="actions"><span className="action">Edit</span>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.question.questionID)}}>Delete</span></span>
      </div>
    );
  }
}

export default ViewQuestion;
