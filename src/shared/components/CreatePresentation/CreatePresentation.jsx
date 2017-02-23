import Inferno from 'inferno';
import Component from 'inferno-component';
import AddQuestion from './AddQuestion.jsx';
import ViewQuestion from './ViewQuestion.jsx';
import propTypes from 'proptypes';
Inferno.PropTypes = propTypes;

// create edit Q as seperate everything...
// check most recent presentationID for #Qs before creating new pid

var dbURL = 'http://localhost:5000';

function initPid(userID) {
  return fetch(dbURL + '/postPByU',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'userID': userID})
    }).then(data => data.json());
}

function getQs(pid) {
  return fetch(dbURL + '/qByP/'+pid,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function updateTitle(pid, title) {
  return fetch(dbURL + '/UPDATEHERE',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'UPDATEHERE': 'FOR PID AND TITLE'})
    }).then(data => data.json());
  // update above once title is added to presentation schema
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
  return fetch(dbURL + '/UPDATEHERE',{
    method: 'PUT',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'UPDATEHERE': 'FOR PID, QID, QUESTION, TYPE'})
    }).then(data => data.json());
  // add qid with corrent format above
}

function deleteQ(qid) {
  return fetch(dbURL + '/UPDATEHERE',{
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'UPDATEHERE': 'FOR QID'})
    }).then(data => data.json());
  // add qid with corrent format above
}

class Create extends Component {
  static get NAME() {
    return 'Create';
  }

  static get contextTypes() {
    return {data: inferno.PropTypes.object};
  }

  static requestData(params, domain='') {
    return initPid();
    // need args?
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: (context.data[Create.NAME] || []),
      presentationID: 0,
      userID: 22,
      title: '',
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
    // eventually use get request to fetch all Q's associated with ppt and set state for edit ppt
    if (this.props.params.id > 0) {
      this.setState({presentationID: this.props.params.id});
      getQs(this.props.params.id).then(data => {
        this.setState({questions: data});
      }).catch(error => {});
    } else {
      // check user's last ppt questions length for 0
      initPid(this.state.userID)
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
    initPid(this.state.presentationID, this.state.title);
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
        questions.push({question: newQuestion, qid: data.questionID, questionID: data.questionID});
        this.setState({questions: questions});
      });
    postAnswers(data.questionID, answers);
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

      <p className="presentation">&nbsp;Presentation Type: {this.state.typeDescription}</p>
        <div className="addQuestion">
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 1)}}><p className="option">Multiple Choice</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 2)}}><p className="option">Free Response</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 3)}}><p className="option2">🙁 😐 🙂</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 4)}}><p className="option2">👍 👎</p></a>
          <a href="#" className="ppt" onClick={(e) => {this.handleType(e, 5)}}><p className="option">⭐ ⭐ ⭐</p></a>
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

export default Create;
