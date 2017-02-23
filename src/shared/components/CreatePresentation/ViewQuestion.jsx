import Inferno from 'inferno';
import Component from 'inferno-component';
import propTypes from 'proptypes';
Inferno.PropTypes = propTypes;

var dbURL = 'http://localhost:5600';

function getAs(qid) {
  return fetch(dbURL + '/aByQ/'+qid,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

class ViewQuestion extends Component {
    static get NAME() {
    return 'ViewQuestion';
  }

  static get contextTypes() {
    return {data: inferno.PropTypes.object};
  }

  static requestData(params, domain='') {
    return getAs();
    // need args?
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: (context.data[ViewQuestion.NAME] || []),
      answers: []
    };

    this.viewAnswers = this.viewAnswers.bind(this);
  }

  viewAnswers(qid) {
    if (this.state.answers.length > 0) {
      this.setState({answers: []});
    } else {    
      getAs(qid)
        .then(data => {
          this.setState({answers: data});
        });
    }
  }

  // function to edit questions --> changes qid in the add new question box

  render() {
    return (
      <div>
      <div className="viewQuestion">
          <span className="title">#{this.props.index + 1} - {this.props.question.question}</span>
            <span className="actions"><span className="action" onClick={() => {this.viewAnswers(this.props.question.questionID)}}>{this.state.answers.length > 0 ? <span>Hide</span> : <span>View</span>} &nbsp;Answers</span>&nbsp;|&nbsp;
            <span className="action">Edit</span>&nbsp;|&nbsp;
            <span className="action" onClick={() => {this.props.delete(this.props.question.questionID)}}>Delete</span></span>
      </div>

        {this.state.answers.length > 0 ?
          (<div className="viewAnswers">
            <span className="answerText">Answer Choices:</span>
            {this.state.answers.map((answer, index) => {
                return (
                   <span className="actions"><p className="answerText">{answer.answer}</p></span>
                )
              })
            }
            <br />
          </div>
          ) : ''
        }
      </div>
    );
  }
}

export default ViewQuestion;
