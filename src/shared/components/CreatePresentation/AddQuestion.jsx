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
    if (this.props.type === 1) {
      var newAnswer={index: this.state.answers.length, answer:'', correct: ''};
      var answers = this.state.answers;
      answers.push(newAnswer);
      this.setState({answers: answers});
    }
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

  addAnswerToView(ans, aid) {
    var answers = this.state.answers;
    var newAnswers = [];
    this.state.answers.forEach((answer, index) => {
      if (answer.index !== aid) {
        newAnswers.push(answer);
      } else {
        var newAnswer = {index: index, answer: ans, correct: answer.correct};
        newAnswers.push(newAnswer);
      }
    });
    this.setState({answers: newAnswers});
  }

  addAnswerCorrect(isCorrect, aid) {
    var answers = this.state.answers;
    var newAnswers = [];
    this.state.answers.forEach((answer, index) => {
      if (answer.index !== aid) {
        newAnswers.push(answer);
      } else {
        var newAnswer = {index: index, answer: answer.answer, correct: '' + isCorrect};
        newAnswers.push(newAnswer);
      }
    });
    this.setState({answers: newAnswers});
  }

  saveQuestion(e) {
    e.preventDefault();
    if (this.state.question.length > 0) {
      var newQuestion = this.state.question;
      var answers;
      if (this.props.type === 1) {
        answers = this.state.answers;
      } else {
        var types = {
          3: [{answer: '🙁', correct: 'false'}, {answer: '😐', correct: 'false'}, {answer: '🙂', correct: 'false'}],
          4: [{answer: '👍', correct: 'false'}, {answer: '👎', correct: 'false'}],
          5: [{answer: '⭐', correct: 'false'}, {answer: '⭐⭐', correct: 'false'}, {answer: '⭐⭐⭐', correct: 'false'}, {answer: '⭐⭐⭐⭐', correct: 'false'}, {answer: '⭐⭐⭐⭐⭐', correct: 'false'}]
        };
        answers = types[this.props.type];
      }
      this.setState({question: ''});
      this.setState({answers: []});
      this.props.addToViewQuestions(newQuestion, answers);
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
                
              {this.props.type === 1 && this.state.answers.length > 0 ?
                (<div className="answer">
                  <p className="questionText">Multiple Choice Answers<br/></p>
                  {this.state.answers.map((answer, index) => {
                      return (
                        <AddAnswer answer={answer} index={index} add={this.addAnswerToView} correct={this.addAnswerCorrect} delete={this.deleteAnswer} />
                      )
                    })
                  }
                  <br />
                </div>
                ) : ''
              }

                {this.props.type === 1 ? (<button className="button" onClick={this.addAnswerInput}>Add New Answer</button>) : ''}
                <button type="submit" className="button">✓ Save Question</button>
                </div>
              </form>
          </div>
        </div>
    );
  }
}

export default AddQuestion;
