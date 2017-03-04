import Inferno from 'inferno';
import Component from 'inferno-component';

var statsURL = `http://${STATSIP}:${STATSPORT}`;
function getSessionStats(userID) {
  return fetch(statsURL + '/userSessionStats/' + userID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}
class UserStats extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      stats: []
    }
  }
  componentDidMount() {
    if (this.props.user) {
      getSessionStats(this.props.user.userID)
      .then(stats => { 
        this.setState({stats});
       })
      .catch(error => { console.log(error, 'unknown error loading session data.. refresh'); });
    }
  }
  render() {
    return (
      <div >
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Questions</th>
            <th>Responses</th>
            <th>Participants</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
            {this.state.stats.map(stat => <tr><td>{stat.title}</td><td>{stat.questions}</td><td>{stat.responses}</td><td>{stat.participants}</td><td>{stat.createdAt}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserStats;
