import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';

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
      stats: '',
      groupName: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      getGroups(this.props.user.userID)
      .then(data => { 
        this.setState({groups: data});
       })
      .catch(error => { this.setState({groups: []});});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      getGroups(nextProps.user.userID)
      .then(data => { 
        this.setState({groups: data});
       })
      .catch(error => { this.setState({groups: []}); });
    }
  }

  handleChange(e) {
    var that = this;
    this.setState({stats: 'loading'});
    if (e.target.value != -1) {
      var index = e.target.selectedIndex;
      this.setState({groupName: e.target[index].text});
      getGroupStats(that.props.user.userID, e.target.value).then(stats => {
        function compare(a,b) {
          if (a.lastName < b.lastName)
            return -1;
          if (a.lastName > b.lastName)
            return 1;
          return 0;
        }
        var sorted = stats.sort(compare);
        this.setState({stats: sorted});
      })
      .catch(error => { this.setState({stats: []}); });;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <div className="row">
       {(Array.isArray(this.state.groups) && this.state.groups.length === 0) ?  <div><p className="loadingText">You have no groups. <br/>Click&nbsp;<Link to="/creategroup" className="loadingText">here</Link>&nbsp;to create your first group!</p></div> :
        <select onChange={this.handleChange}  className="styled-select slate">
          <option value="-1">&nbsp; Please select a group</option>
          {this.state.groups.map(group => <option value={group.groupID}>&nbsp; {group.name}</option>)}
        </select>}
        </div>
        <div className="row">
        {this.state.stats === 'loading' ? <div><img src="http://i66.tinypic.com/2qvw0ax.gif" /><p className="loadingText">Loading...</p></div> :  
        this.state.stats.length > 0 ? 
        (<div><h1 className="presentationTitle">{this.state.groupName} Statistics</h1><br/><br/>
        <table>
          <thead>
          <tr>
            <th>&nbsp;Last Name</th>
            <th className="twidth">&nbsp;First Name</th>
            <th className="tcenter">Responses</th>
            <th className="tcenter">Participants</th>
          </tr>
          </thead>
          <tbody>
            {this.state.stats.map(stat => <tr className="shadow"><td>{stat.lastName}</td><td className="twidth">{stat.firstName}</td><td  className="tcenter">{stat.responses}</td><td  className="tcenter">{stat.participants}</td></tr>)}
          </tbody>
        </table><br /><br /><br /></div>) : 
        (Array.isArray(this.state.stats) && this.state.stats.length === 0) ? <p className="loadingText">There is no data for this group</p> : ''}
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
