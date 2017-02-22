import Inferno from 'inferno';
import Component from 'inferno-component';

class AddAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      correct: false,
      checked: false
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
  }

  handleAnswer(e) {
    this.setState({answer: e.target.value});
    this.props.add(this.state.answer, this.props.index);
    e.preventDefault();
  }

  handleCorrect(e) {
    var value = !this.state.checked;
    this.setState({correct: value});
    this.setState({checked: value});
    this.props.correct(this.state.correct, this.props.index);
  }

  render() {
    return (
      <div className="viewQuestion">
          <input type="text" className="ainput" placeholder="Answer goes here" value={this.state.answer} onInput={this.handleAnswer} required />
          <input type="checkbox" className="check" onClick={this.handleCorrect} checked={this.state.checked} />
          <span className="correct">Correct?</span>
          <span className="actions">
            <span className="delete" onClick={() => {this.props.delete(this.props.index)}}>⨂</span>
          </span>
      </div>
    );
  }
}

export default AddAnswer;
