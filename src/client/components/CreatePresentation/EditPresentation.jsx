import Inferno from 'inferno';
import Component from 'inferno-component';
import AddQuestion from './AddQuestion.jsx';
import ViewQuestion from './ViewQuestion.jsx';

// create edit Q as seperate everything...

var dbURL = `http://${DBIP}:${DBPORT}`;
function initPid(userID) {
  return fetch(dbURL + '/pByU',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'userID': userID, 'title': 'New Presentation'})
    }).then(data => data.json());
}

function getQs(pid) {
  return fetch(dbURL + '/qByP/'+pid,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json()).catch();
}

function getTitle(pid, title) {
  return fetch(dbURL + '/pByU/' + pid,{
    method: 'PUT',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'title': title})
    }).then(data => data.json());
}

function updateTitle(pid, title) {
  return fetch(dbURL + '/p/' + pid,{
    method: 'PUT',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'title': title})
    }).then(data => data.json());
}

function postQ(pid, type, question) {
  return fetch(dbURL + '/qByP',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'presentationID': pid, 'type': type, 'question': question})
    }).then(data => data.json());
}

function postAnswers(qid, answers) {
  return fetch(dbURL + '/aByQs',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'questionID': qid, 'answers': answers})
    }).then(data => data.json());
}

function editQ(qid) {
  return fetch(dbURL + '/q/' + qid,{
    method: 'PUT',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'UPDATEHERE': 'FOR PID, QID, QUESTION, TYPE'})
    }).then(data => data.json());
  // add body with corrent format above
}

function deleteQ(qid) {
  return fetch(dbURL + '/q/'+ qid,{
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'}
    });
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationID: 0,
      title: this.props.params.title,
      type: 1,
      typeDescription: 'Multiple Choice',
      qid: 0,
      questions: []
    };

    // revise userID after auth is enabled

    this.handleTitle = this.handleTitle.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.addToViewQuestions = this.addToViewQuestions.bind(this);
  }

  componentDidMount() {
    if (this.props.params.id > 0) {
      this.setState({presentationID: this.props.params.id});
      this.setState({title: this.props.params.title});
      getQs(this.props.params.id).then(data => {
        this.setState({questions: data});
      }).catch(error => {});
    } else {
      initPid(this.props.user.userID)
        .then(data => {this.setState({presentationID: data.presentationID})});
    }
  }

  handleTitle(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleType(e, type) {
    e.preventDefault();
    this.setState({type: type});
    var types = {
      1: 'Multiple Choice',
      2: 'Free Response',
      3: '🙁 😐 🙂',
      4: '👍 👎',
      5: '⭐ ⭐ ⭐'
    };
    this.setState({typeDescription: types[type]});
  }

  handleSubmit(e) {
    e.preventDefault();
    updateTitle(this.state.presentationID, this.state.title);
  }

  deleteQuestion(qid) {
    var questions = [];
    this.state.questions.forEach((question, index) => {
      if (question.questionID !== qid) {
        questions.push(question);
      }
    });
    this.setState({questions: questions});
    deleteQ(qid);
  }

  addToViewQuestions(newQuestion, answers) {
    postQ(this.state.presentationID, this.state.type, newQuestion)
      .then(data => {
        var questions = this.state.questions;
        questions.push({question: newQuestion, questionID: data.questionID});
        this.setState({questions: questions});
        postAnswers(data.questionID, answers);
      }).catch();
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

        {this.state.questions.length > 0 ?
          (<div className="question">
            <p className="questionText">Saved Questions<br/></p>
            {this.state.questions.map((question, index) => {
                return (
                  <ViewQuestion question={question} index={index} delete={this.deleteQuestion} />
                )
              })
            }
            <br />
          </div>
          ) : ''
        }

      <p className="presentation">&nbsp;Question Type: {this.state.typeDescription}</p>
        <div className="addQuestion">
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 1)}}><p className="option">Multiple Choice</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 2)}}><p className="option">Free Response</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 3)}}><p className="option2">🙁 😐 🙂</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 4)}}><p className="option2">👍 👎</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 5)}}><p className="option">⭐ ⭐ ⭐</p></a>
        </div>

        <AddQuestion presentationID={this.state.presentationID}
          addToViewQuestions={this.addToViewQuestions}
          type = {this.state.type}
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

export default Edit;
