import Inferno from 'inferno';
import Component from 'inferno-component';

class AddAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      correct: ''
    };

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer(e) {
    e.preventDefault();
    this.setState({answer: e.target.value});
    this.props.addAnswerToView(this.state.answer, this.props.index);
  }

  handleCorrect(e) {
    e.preventDefault();
    this.setState({correct: e.target.value});
    this.props.addAnswerCorrect(this.state.correct, this.props.index);
  }

  render() {
    return (
      <div className="viewQuestion">
          <input type="text" className="qinput" placeholder="Answer goes here" value={this.state.answer} onInput={this.handleAnswer} required />
          <span className="actions"><span className="action" onClick={() => {this.handleCorrect(this.props.index)}}>Correct?</span>
            <span className="action" onClick={() => {this.props.delete(this.props.index)}}>X Delete</span></span>
      </div>
    );
  }
}

export default AddAnswer;
