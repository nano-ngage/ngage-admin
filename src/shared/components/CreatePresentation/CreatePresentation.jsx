import Inferno from 'inferno';
import Component from 'inferno-component';
import AddQuestion from './AddQuestion.jsx';
import ViewQuestion from './ViewQuestion.jsx';

// make handleNewQ function and pass to addQ (like deleteQ) and pass back the new question object

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationID: 0,
      userID: 0,
      title: '',
      questions: [{questionID: 1, question:'What?'}, {questionID: 2, question:'Who?'}, {questionID: 3, question:'Why?'}]
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.addToViewQuestions = this.addToViewQuestions.bind(this);
  }

  componentDidMount() {
    // Generate presentation ID posting with userID
    // eventually use get request to fetch all Q's associated with ppt and set state

    //  put request to update ID
    // myAPI.fetch('/item-names').then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  handleTitle(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.presentationID;
    // PUT request with title for presentation
    // fetch('/pptTitle, {
    //   method: "PUT",
    //   body: {questionID: qid}
    //   }).then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  deleteQuestion(qid) {
    var questions = [];
    this.state.questions.forEach((question, index) => {
      if (question.questionID !== qid) {
        questions.push(question);
      }
    });
    this.setState({questions: questions});
    // fetch('/deleteQ', {
    //   method: "DELETE",
    //   body: {questionID: qid}
    //   }).then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  addToViewQuestions(newQuestion) {
    var questions = this.state.questions;
    questions.push(newQuestion);
    this.setState({questions: questions});
    // fetch('/addQ', {
    //   method: "POST",
    //   body: {question: question}
    //   }).then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  render() {
    return (
      <div className="container">
        <div className="question">
              <div className="submitFlex">
                <div className="presentationText">Presentation Title<br/></div>
                <input type="text" className="input" type="text" placeholder="Title goes here" value={this.state.title} onInput={this.handleTitle} autoComplete="off" />
            </div>
        </div>

      <p className="presentation">&nbsp;Presentation Type:</p>
        <div className="addQuestion">
          <a href="#" className="ppt"><p className="option">Multiple Choice</p></a>
          <a href="#" className="ppt"><p className="option">Free Response</p></a>
          <a href="#" className="ppt"><p className="option2">🙁 😐 🙂</p></a>
          <a href="#" className="ppt" onClick={this.questionType}><p className="option2">👍 👎</p></a>
          <a href="#" className="ppt"><p className="option">⭐ ⭐ ⭐</p></a>
        </div>

        {this.state.questions.length > 0 ?
          (<div className="question">
            <p className="questionText">Saved Questions<br/></p>
            {this.state.questions.map((question, index) => {
                return (
                  <ViewQuestion question={question} delete={this.deleteQuestion} />
                )
              })
            }
            <br />
          </div>
          ) : ''
        }

        <AddQuestion presentationID={this.state.presentationID}
          addToViewQuestions={this.addToViewQuestions}
          length={this.state.questions.length + 1} />

        <div className="submitFlex">
        <form onSubmit={this.handleSubmit}>
          <div className="submitFlexPpt">
          <button type="submit" className="button">✓ Save Presentation</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Create;
