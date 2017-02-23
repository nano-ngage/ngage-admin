import propTypes from 'proptypes';
import Inferno from 'inferno';
import Component from 'inferno-component';

Inferno.PropTypes = propTypes;

// testing
import List from './common/List.jsx';
import Question from './Question.jsx';
import Promise from 'bluebird'

function fakeAjax(cb) {
  var fake_responses = {
    items: [
      {
        title: 'Here is my awesome question title',
        body: 'What do you think of server-side rendering?'
      }
    ]
  };
  var randomDelay = 0;

  console.log("Requesting: with delay", randomDelay);

  setTimeout(function(){
    cb(fake_responses);
  },randomDelay);
}

function getQuestions() {
  return new Promise(function(resolve) {
    fakeAjax(resolve);
  });
}


export default class Home extends Component {
  static get NAME() {
    return 'Home';
  }

  static get contextTypes() {
    return {
      data: Inferno.PropTypes.object
    }
  }

  static requestData(params, domain = '') {
    return getQuestions();
  }

  constructor(props, context) {
    super(props, context);
    this.state = context.data[Home.NAME] || { items: [] };
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
  }


  //event handler
  handleQuestionClick(e) {
    // console.log('e.target', e.target)
    // console.log('this.state:', this.state)
  }

  render() {
    return (
      <div className="welcome">
      <div className="pptcontainer">
        Welcome to nGage!
      </div>
      </div>
    );
  }

  // This is placeholder, but we should also invoke our ajax requests here (if there is a different)
  // in state
  componentDidMount() {
    // console.log('this.state', this.state)
    // console.log('mounted!');
  }
}
