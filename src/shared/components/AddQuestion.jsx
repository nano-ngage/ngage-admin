import Inferno from 'inferno';
import Component from 'inferno-component';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationID: this.props.presentationID,
      type: 4,
      questionID: 0,
      question: ''
    };

    this.questionType = this.questionType.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
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

  questionType() {
    this.setState({type: 4});
  }

  handleQuestion(e) {
    e.preventDefault();
    this.setState({question: e.target.value});
  }

  saveQuestion(e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var newQuestion = {
        presentationID: this.state.presentationID,
        type: this.state.type,
        questionID: this.props.length,
        question: this.state.question
      };
      this.props.addToViewQuestions(newQuestion);
      this.setState({question: ''});
    }
    // make sure to create answer types with questionID!!!!!
  }

  render() {
    return (
      <div className="question">
            <p className="questionText">Question #{this.props.length}</p>
            <div className="submitFlex">
              <form onSubmit={this.saveQuestion}>
              <div className="submitFlex">
              <input type="text" className="qinput" placeholder="Question goes here" value={this.state.question} onInput={this.handleQuestion} required />
                <button type="submit" className="button">Add New Question</button>
                </div>
              </form>
          </div>
        </div>
    );
  }
}

export default AddQuestion;