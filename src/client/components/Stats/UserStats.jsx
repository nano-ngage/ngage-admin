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
      stats: 'loading'
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
      <div className="row">
      {this.state.stats === 'loading' ? <div><img src="http://i66.tinypic.com/2qvw0ax.gif" /><p className="loadingText">Loading...</p></div> :  
        (Array.isArray(this.state.stats) && this.state.stats.length > 0) ? 
        (<div><h1 className="presentationTitle">Session Statistics</h1><br/><br/>
          <table>
          <thead>
          <tr>
            <th>&nbsp;Title</th>
            <th className="tcenter">Questions</th>
            <th className="tcenter">Responses</th>
            <th className="tcenter">Participants</th>
            <th className="tcenter">Date (D/M/Y)</th>
          </tr>
          </thead>
          <tbody>
            {this.state.stats.map(stat => <tr className="shadow"><td>{stat.title}</td><td className="tcenter">{stat.questions}</td><td className="tcenter">{stat.responses}</td><td className="tcenter">{stat.participants}</td><td className="tcenter">{stat.createdAt}</td></tr>)}
          </tbody>
        </table><br /><br /><br /></div>) : (Array.isArray(this.state.stats) && this.state.stats.length === 0) ? <p className="loadingText">There is no data for this group</p> : ''}
      </div>
    );
  }
}

export default UserStats;
