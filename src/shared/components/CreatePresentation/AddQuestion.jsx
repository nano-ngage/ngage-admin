import Inferno from 'inferno';
import Component from 'inferno-component';
import propTypes from 'proptypes';
Inferno.PropTypes = propTypes;

function postQ(pid, type, question) {
  return fetch('http://localhost:5000/postPByU',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({"presentationID": pid, "type": type, "question": question})
    }).then(data => data.json());
}

class AddQuestion extends Component {
  static get NAME() {
    return 'AddQuestion';
  }

  static get contextTypes() {
    return {data: inferno.PropTypes.object};
  }

  static requestData(params, domain='') {
    return postQ();
    // need args?
  }

  constructor(props) {
    super(props);
    this.state = {
      items: (context.data[AddQuestion.NAME] || []),
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
    // postQ(this.state.presentationID, this.state.type, this.state.question);
    // .then(data => {
      // do something with returned data
      // example) 
      // {
      //   "questionID": 20,
      //   "presentationID": 12,
      //   "type": 4,
      //   "question": "hello world",
      //   "createdAt": "2017-02-22T04:11:51.044Z",
      //   "updatedAt": "2017-02-22T04:11:51.044Z"
      // }
    // });
    console.log(postQ(this.state.presentationID, this.state.type, this.state.question));
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
