import Inferno from 'inferno';
import Component from 'inferno-component';
import AddAnswer from './AddAnswer.jsx';

// make sure qid PUT and question# title updates if you're editing a question...
// add edit answers functionality...

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answers: []
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.addAnswerInput = this.addAnswerInput.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.addAnswerToView = this.addAnswerToView.bind(this);
    this.addAnswerCorrect = this.addAnswerCorrect.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
  }

  handleQuestion(e) {
    e.preventDefault();
    this.setState({question: e.target.value});
  }

  addAnswerInput(e) {
    e.preventDefault();
    var newAnswer={index: this.state.answers.length, answer:'', correct: ''};
    var answers = this.state.answers;
    answers.push(newAnswer);
    this.setState({answers: answers});
  }

  deleteAnswer(aid) {
    var answers = [];
    this.state.answers.forEach((answer, index) => {
      if (answer.index !== aid) {
        answers.push(answer);
      }
    });
    this.setState({answers: answers});
  }

  addAnswerToView(answer, aid) {
    var answers = this.state.answers;
    this.state.answers.forEach((answer, index) => {
      if (answer.index !== aid) {
        answers.push(answer);
    // var newAnswer={index: this.state.answers.length, answer:'', correct: ''};
    // questions.push({question: newQuestion, qid: data.questionID});
      }
    });
    this.setState({answers: answers});
  }

  addAnswerCorrect(isCorrect, aid) {
    var answers = this.state.answers;
    this.state.answers.forEach((answer, index) => {
      if (answer.index !== aid) {
        answers.push(answer);
    // var newAnswer={index: this.state.answers.length, answer:'', correct: ''};
    // questions.push({question: newQuestion, qid: data.questionID});
      }
    });
    this.setState({answers: answers});
  }

  saveQuestion(e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var newQuestion = this.state.question;
      var answers = [{"answer": "A", "correct": "false"}, {"answer": "B", "correct": "false"}, {"answer": "C", "correct": "true"}, {"answer": "D", "correct": "false"}];
      this.props.addToViewQuestions(newQuestion, answers);
      this.setState({question: ''});
    };
  }

  render() {
    return (
      <div className="question">
            <p className="questionText">Question #{this.props.length}</p>
            <div className="submitFlex">
              <form onSubmit={this.saveQuestion}>
              <div className="submitFlex">
              <input type="text" className="qinput" placeholder="Question goes here" value={this.state.question} onInput={this.handleQuestion} required />
                
              {this.state.answers.length > 0 ?
                (<div className="question">
                  <p className="questionText">Answer Choices<br/></p>
                  {this.state.answers.map((answer, index) => {
                      return (
                        <AddAnswer answer={answer} index={index} add={this.addAnswerToView} delete={this.deleteAnswer} />
                      )
                    })
                  }
                  <br />
                </div>
                ) : ''
              }

                <button className="button" onClick={this.addAnswerInput}>Add New Answer</button>
                <button type="submit" className="button">✓ Save Question</button>
                </div>
              </form>
          </div>
        </div>
    );
  }
}

export default AddQuestion;
