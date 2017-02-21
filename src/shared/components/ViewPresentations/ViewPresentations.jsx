import Inferno from 'inferno';
import Component from 'inferno-component';
import ViewPpt from './ViewPpt.jsx';
import propTypes from 'proptypes';
Inferno.PropTypes = propTypes;

function getPpts(userID) {
  return fetch('http://localhost:5000/pByU/'+userID,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function deletePpt(pid) {
  return fetch('http://localhost:5000/UPDATEHERE',{
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'UPDATEHERE': 'FOR PID'})
    }).then(data => data.json());
  // add qid with corrent format above
}

class ViewPresentations extends Component {
  static get NAME() {
    return 'ViewPresentations';
  }

  static get contextTypes() {
    return {data: inferno.PropTypes.object};
  }

  static requestData(params, domain='') {
    return getPpts();
    // need args?
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      userID: 22,
      ppts: []
    };

    // revise userID after auth is enabled

    this.deletePpt = this.deletePpt.bind(this);
  }

  componentDidMount() {
   getPpts(this.state.userID)
    .then(data => {this.setState({ppts: data})});
  }

  deletePpt(pid) {
    var ppts= [];
    this.state.ppts.forEach((ppt, index) => {
      if (ppt.presentationID !== pid) {
        ppts.push(ppt);
      }
    });
    this.setState({ppts: ppts});
    deletePpt(pid);
  }

  render() {
    return (
      <div className="container">
      <p className="presentation">&nbsp;View Presentations:</p>
      <div className="viewContainer">
        {this.state.ppts.map((ppt, index) => {
            return (
              <ViewPpt ppt={ppt} key={index} delete={this.deletePpt} />
            )
          })
        }
      </div>
      </div>
    );
  }
}

export default ViewPresentations;
