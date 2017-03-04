import Inferno from 'inferno';
import Component from 'inferno-component';

var dbURL = '';

function searchUsers(search) {
  return fetch(dbURL + '/searchU/'+search,{
    method: 'GET',
    mode: 'CORS',
    headers: {'Content-Type': 'application/JSON'},
    }).then(data => data.json()).catch();
}

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      potentialUsers: [],
      checked: false
    };

    dbURL = `http://104.131.147.199:5000`;

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
    if (this.state.search.length > 3) {
      searchUsers(this.state.search)
        .then(data => {
          this.setState({checked: false});
          this.setState({potentialUsers: data});
         }).catch(error => {});
    }
  }

  handleAdd(user) {
   this.setState({search: ''}); 
    if (user.userID) {
      this.props.addToViewUsers(user);
    }
    var value = !this.state.checked;
    this.setState({checked: value});
  }

  render() {
    return (
      <div>
      <div className="question">
            <p className="questionText">Search for User</p>
            <div className="submitFlex">
              <form>
              <div className="submitFlex">
              <input type="text" className="qinput" placeholder="Enter First and/or Last Name" value={this.state.search} onInput={this.handleSearch} required />
                </div>
              </form>
            </div>

          {this.state.potentialUsers.length > 0 ?
            (<div>{this.state.potentialUsers.map((user, index) => {
                return (
                  <div className="viewQuestion">
                      <span className="title">{user.firstName + ' ' + user.lastName}</span>
                        <span className="actions">
                        <input type="checkbox" className="check" onClick={() => {this.handleAdd(user)}} checked={this.state.checked} />
                        <span className="correct" onClick={() => {this.handleAdd(user)}}>Add User</span>
                      </span>
                  </div>
                )
              })
            }
            <br />
          </div>
          ) : ''
        }

        </div>
        </div>
    );
  }
}

export default AddUser;
