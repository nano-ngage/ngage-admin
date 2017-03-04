import Inferno from 'inferno';
import Component from 'inferno-component';
// import AddQuestion from './AddQuestion.jsx';
// import ViewGroup from './ViewGroup.jsx';

// create edit Q as seperate everything...
var dbURL = '';
function initGid(userID) {
  return fetch(dbURL + '/g',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'userID': userID, 'name': 'New Group'})
    }).then(data => data.json());
}

function updateName(gid, name) {
  return fetch(dbURL + '/g/' + gid,{
    method: 'PUT',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'name': name})
    }).then(data => data.json());
}

// function getUsers(pid) {
//   return fetch(dbURL + '/qByP/'+pid,{
//     method: 'GET',
//     mode: 'CORS',
//     headers: {'Content-Type': 'application/JSON'},
//     }).then(data => data.json()).catch();
// }

// function postQ(pid, type, question) {
//   return fetch(dbURL + '/qByP',{
//     method: 'POST',
//     mode: 'CORS',
//     headers: {'Content-Type': 'application/JSON'},
//     body: JSON.stringify({'presentationID': pid, 'type': type, 'question': question})
//     }).then(data => data.json());
// }

// function postAnswers(qid, answers) {
//   return fetch(dbURL + '/aByQs',{
//     method: 'POST',
//     mode: 'CORS',
//     headers: {'Content-Type': 'application/JSON'},
//     body: JSON.stringify({'questionID': qid, 'answers': answers})
//     }).then(data => data.json());
// }

// function editQ(qid) {
//   return fetch(dbURL + '/q/' + qid,{
//     method: 'PUT',
//     mode: 'CORS',
//     headers: {'Content-Type': 'application/JSON'},
//     body: JSON.stringify({'UPDATEHERE': 'FOR PID, QID, QUESTION, TYPE'})
//     }).then(data => data.json());
//   // add body with corrent format above
// }

// function deleteQ(qid) {
//   return fetch(dbURL + '/q/'+ qid,{
//     method: 'DELETE',
//     mode: 'CORS',
//     headers: {'Content-Type': 'application/JSON'}
//     }).then(data => data.json()).catch();
// }

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupID: 0,
      name: ''
      // qid: 0,
      // questions: []
    };
    dbURL = `http://104.131.147.199:5000`;

    this.handleName = this.handleName.bind(this);
    // this.handleType = this.handleType.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.deleteQuestion = this.deleteQuestion.bind(this);
    // this.addToViewQuestions = this.addToViewQuestions.bind(this);
  }

  componentDidMount() {
    // if (this.props.params.id > 0) {
    //   this.setState({groupID: this.props.params.id});
    //   this.setState({title: this.props.params.title});
    //   getQs(this.props.params.id).then(data => {
    //     this.setState({questions: data});
    //   }).catch(error => {});
    // } else 
    if (this.props.user) {
      initGid(this.props.user.userID)
        .then(data => {this.setState({groupID: data.groupID})});
    }
  }

  handleName(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    updateName(this.state.groupID, this.state.name);
  }

  // deleteQuestion(qid) {
  //   var questions = [];
  //   this.state.questions.forEach((question, index) => {
  //     if (question.questionID !== qid) {
  //       questions.push(question);
  //     }
  //   });
  //   this.setState({questions: questions});
  //   deleteQ(qid);
  // }

  // addToViewQuestions(newQuestion, answers) {
  //   postQ(this.state.presentationID, this.state.type, newQuestion)
  //     .then(data => {
  //       var questions = this.state.questions;
  //       questions.push({question: newQuestion, questionID: data.questionID});
  //       this.setState({questions: questions});
  //       postAnswers(data.questionID, answers);
  //     }).catch();
  // }

  render() {
    return (
      <div className="container">
        <div className="question">
              <div className="submitFlex">
                <div className="presentationText">Group Name<br/></div>
                <input type="text" className="input" type="text" placeholder="Group name goes here" value={this.state.name} onInput={this.handleName} autoComplete="off" />
            </div>
        </div>



        <div className="submitFlex">
        <form onSubmit={this.handleSubmit}>
          <div className="submitFlexPpt">
          <button type="submit" className="button">✓ Group</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
