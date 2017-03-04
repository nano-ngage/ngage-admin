import Inferno from 'inferno';
import Component from 'inferno-component';

var dbURL = `http://${DBIP}:${DBPORT}`;
var statsURL = `http://${STATSIP}:${STATSPORT}`;
function getPresentations(userID) {
  return fetch(dbURL + '/pByU/' + userID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}
function getPresentationStats(presentationID) {
  return fetch(statsURL + '/presentationStats/' + presentationID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}
// function getGroupStats(userID, groupID) {
//   return fetch(statsURL + '/groupStats?groupID=' + groupID + '&presenterID=' + userID,{
//       method: 'GET',
//       mode: 'CORS',
//       headers: {'Content-Type': 'application/JSON'}
//       }).then(data => data.json());
// }
class PresentationStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
      stats: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    if (this.props.user) {
      getPresentations(this.props.user.userID)
      .then(presentations => { 
        this.setState({presentations});
       })
      .catch(error => { console.log('unknown error loading presentation data.. refresh'); });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      getPresentations(nextProps.user.userID)
      .then(data => { 
        this.setState({presentations});
       })
      .catch(error => { console.log('unknown error loading presentation data.. refresh'); });
    }
  }
  handleChange(e) {
    var that = this;
    if (e.target.value != -1) {
      getPresentationStats(e.target.value).then(stats => {
        console.log(stats);
        console.log();
        this.setState({stats});
      })
    }
  }
  render() {
    return (
      <div >
        <select onChange={this.handleChange}>
          <option value="-1">Please select a presentation</option>
          {this.state.presentations.map(presentation => <option value={presentation.presentationID}>{presentation.title}</option>)}
        </select>
        <div>
          <svg viewBox="0 0 500 100" class="chart">
            <polyline
               fill="none"
               stroke="#0074d9"
               stroke-width="3"
               points={this.state.stats.map((stats, index) => {return index*20 + ',' + stats.responses + ' '}).join('')}/>
            <polyline
               fill="none"
               stroke="#be0000"
               stroke-width="3"
               points={this.state.stats.map((stats, index) => {return index*20 + ',' + stats.participants + ' '}).join('')}/>
          </svg>
        </div>
      </div>
    );
  }
}

export default PresentationStats;

// a
//         <table>
//           <thead>
//           <tr>
//             <th>Name</th>
//             <th>Responses</th>
//             <th>Participants</th>
//           </tr>
//           </thead>
//           <tbody>
//             {this.state.stats.map(stat => <tr><td>{stat.firstName + ' ' + stat.lastName}</td><td>{stat.responses}</td><td>{stat.participants}</td></tr>)}
//           </tbody>
//         </table>
// a
// "0,120
//                  20,60
//                  40,80
//                  60,20"
