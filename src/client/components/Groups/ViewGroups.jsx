import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import ViewGroup from './ViewGroup.jsx';

var dbURL = '';

function getGroups(userID) {
  return fetch(dbURL + '/gByU/'+ userID,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json());
}

function dbDeleteGroup(gid) {
  fetch(dbURL + '/g/' + gid,{
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'}
    })
}

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    dbURL = `http://104.131.147.199:5000`;

    // revise userID after auth is enabled
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      getGroups(this.props.user.userID)
        .then(data => { this.props.handleGroups(data) })
        .catch(error => { console.log('unknown error loading users data.. refresh'); });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      getGroups(nextProps.user.userID)
      .then(data => { 
         this.props.handleGroups(data)
       })
      .catch(error => { console.log('unknown error loading group data.. refresh'); });
    }
  }

  deleteGroup(gid) {
    var groups = [];
    this.props.groups.forEach((group, index) => {
      if (group.groupID !== gid) {
        groups.push(group);
      }
    });
    this.props.handleGroups(groups);
    dbDeleteGroup(gid);
  }

  render() {
    return (
      <div className="pptcontainer">
      <div className="viewContainer">
      <div className="create">
        <Link to="/createGroup" className="createText"><img src="http://i66.tinypic.com/2i2l43.png" height="20px" className="icon" />&nbsp;New Group</Link>
      </div>
        {this.props.groups.length > 0 ? (this.props.groups.map((group, index) => {
            return (
              <ViewGroup group={group} key={index} delete={this.deleteGroup}/>
            )
          })) : (<div className="viewPpt"><Link to="/creategroup" className="newEntry">Click here to create a group!</Link></div>)
        }
      </div>
      </div>
    );
  }
}

export default ViewGroups;
