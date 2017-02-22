import Inferno from 'inferno';
import Component from 'inferno-component';
import ViewPpt from './ViewPpt.jsx';
import propTypes from 'proptypes';
Inferno.PropTypes = propTypes;
var dbURL = 'http://localhost:5000';

function getPpts(userID) {
  return fetch(dbURL + '/pByU/'+userID,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function deletePpt(pid) {
  return fetch(dbURL + '/UPDATEHERE',{
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
    .then(data => {this.setState({ppts: data})}).catch(error => {console.log('unknown error loading users data.. refresh')});
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
      <div className="pptcontainer">
      <div className="viewContainer">
      <p className="presentation">View Presentations</p>
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
