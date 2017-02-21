import Inferno from 'inferno';
import Component from 'inferno-component';

// add add/edit answers functionality...
// make sure qid PUT and question# title updates if you're editing a question...

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
  }

  handleQuestion(e) {
    e.preventDefault();
    this.setState({question: e.target.value});
  }

  saveQuestion(e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var newQuestion = this.state.question;
      this.setState({question: ''});
      this.props.addToViewQuestions(newQuestion);
    }
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
