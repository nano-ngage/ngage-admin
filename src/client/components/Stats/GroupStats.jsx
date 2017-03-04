import Inferno from 'inferno';
import Component from 'inferno-component';

var dbURL = `http://${DBIP}:${DBPORT}`;
var statsURL = `http://${STATSIP}:${STATSPORT}`;
function getGroups(userID) {
  return fetch(dbURL + '/gByU/' + userID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}
function getGroupStats(userID, groupID) {
  return fetch(statsURL + '/groupStats?groupID=' + groupID + '&presenterID=' + userID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}
class GroupStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      stats: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    if (this.props.user) {
      getGroups(this.props.user.userID)
      .then(data => { 
        this.setState({groups: data});
       })
      .catch(error => { console.log('unknown error loading group data.. refresh'); });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      getGroups(nextProps.user.userID)
      .then(data => { 
        this.setState({groups: data});
       })
      .catch(error => { console.log('unknown error loading group data.. refresh'); });
    }
  }
  handleChange(e) {
    var that = this;
    if (e.target.value != -1) {
      getGroupStats(that.props.user.userID, e.target.value).then(stats => {
        console.log(stats);
        this.setState({stats});
      })
    }
  }
  render() {
    return (
      <div >
        <select onChange={this.handleChange}>
          <option value="-1">Please select a group</option>
          {this.state.groups.map(group => <option value={group.groupID}>{group.name}</option>)}
        </select>
        <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Responses</th>
            <th>Participants</th>
          </tr>
          </thead>
          <tbody>
            {this.state.stats.map(stat => <tr><td>{stat.firstName + ' ' + stat.lastName}</td><td>{stat.responses}</td><td>{stat.participants}</td></tr>)}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default GroupStats;

  // <tr className="rating-entry">
  //   <td>{rating.firstName}</td>
  //   <td><Rating className="ratingStar" id="rating-img" empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" initialRate={rating.rating} readonly={true}/></td>
  // </tr>
