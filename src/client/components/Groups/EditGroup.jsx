import Inferno from 'inferno';
import Component from 'inferno-component';
import AddUser from './AddUser.jsx';

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

function getUsers(gid) {
  return fetch(dbURL + '/gmByG/'+gid,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json()).catch();
}

function postUser(gid, uid) {
  return fetch(dbURL + '/gm',{
    method: 'POST',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    body: JSON.stringify({'groupID': gid, 'userID': uid})
    }).then(data => data.json());
}

function deleteUser(gid, uid) {
  return fetch(dbURL + '/gm/'+ gid + '/' + uid, {
    method: 'DELETE',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'}
    }).then(data => data.json()).catch();
}

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupID: 0,
      name: '',
      users: []
    };

    dbURL = `http://104.131.147.199:5000`;

    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addToViewUsers = this.addToViewUsers.bind(this);
  }

  componentDidMount() {
    if (this.props.params.id > 0) {
      this.setState({groupID: this.props.params.id});
      this.setState({name: this.props.params.name});
      getUsers(this.props.params.id).then(data => {
        this.setState({users: data});
       }).catch(error => {});
    } else if (this.props.user) {
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

  deleteUser(uid) {
    var users = [];
    this.state.users.forEach((user, index) => {
      if (user.userID !== uid) {
        users.push(user);
      }
    });
    this.setState({users: users});
    deleteUser(this.state.groupID, uid);
  }

  addToViewUsers(newUser) {
    if (this.state.users.map((user, index) => {
      return user.userID;
    }).indexOf(newUser.userID) === -1) {
      var users = this.state.users;
      users.push(newUser);
      this.setState({users: users});
      postUser(this.state.groupID, newUser.userID)
        .then(data => {
        }).catch();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="question">
              <div className="submitFlex">
                <div className="presentationText">Group Name<br/></div>
                <input type="text" className="input" type="text" placeholder="Group name goes here" value={this.state.name} onInput={this.handleName} autoComplete="off" />
            </div>
        </div>

        {this.state.users.length > 0 ?
          (<div className="question">
            <p className="questionText">Current Group Members<br/></p>
            {this.state.users.map((user, index) => {
                return (
                  <div className="viewQuestion">
                      <span className="title">{user.firstName + ' ' + user.lastName}</span>
                        <span className="actions">
                        <span className="action" onClick={() => {this.deleteUser(user.userID)}}>Delete</span>
                      </span>
                  </div>
                )
              })
            }
            <br />
          </div>
          ) : ''
        }

        <AddUser groupID={this.state.groupID} addToViewUsers={this.addToViewUsers} />

        <div className="submitFlex">
        <form onSubmit={this.handleSubmit}>
          <div className="submitFlexPpt">
          <button type="submit" className="button">✓ Save Group</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default EditGroup;
