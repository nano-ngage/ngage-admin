import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import ViewPpt from './ViewPpt.jsx';

var dbURL = '';

function getPpts(userID) {
  return fetch(dbURL + '/pByU/'+ userID,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function dbDeletePpt(pid) {
  return fetch(dbURL + '/p/' + pid,{
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'}
    }).then(data => data.json()).catch();
}

function startPpt(pid, code) {
  return fetch(dbURL + '/sByPS',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'presentationID': pid, 'socket': code})
    }).then(data => data.json());
}

class ViewPresentations extends Component {
  constructor(props) {
    super(props);
    dbURL = `http://104.131.147.199:5000`;

    // revise userID after auth is enabled
    this.generateRoomCode = this.generateRoomCode.bind(this);
    this.deletePpt = this.deletePpt.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      getPpts(this.props.user.userID)
      .then(data => { this.props.handlePresentations(data); })
      .catch(error => { console.log('unknown error loading users data.. refresh'); });
    }
  }

  deletePpt(pid) {
    var ppts = [];
    this.props.ppts.forEach((ppt, index) => {
      if (ppt.presentationID !== pid) {
        ppts.push(ppt);
      }
    });
    this.props.handlePresentations(ppts);
    dbDeletePpt(pid);
  }

  generateRoomCode(pid) {
    var length = 6;
    var code = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    startPpt(pid, code).then(data => {
      window.location.replace('http://104.131.147.199:3000/presentation/' + data.socket);
    });
  }

  render() {
    return (
      <div className="pptcontainer">
      <div className="viewContainer">
      <p className="presentation">View Presentations</p>
        {this.props.ppts.length > 0 ? (this.props.ppts.map((ppt, index) => {
            return (
              <ViewPpt ppt={ppt} key={index} delete={this.deletePpt} start={this.generateRoomCode} />
            )
          })) : (<div className="emptyPpt">
        Click&nbsp;<Link to="/create" className="emptyPptText">here</Link>
        &nbsp;to create a presentation!</div>)
        }
      </div>
      </div>
    );
  }
}

export default ViewPresentations;
