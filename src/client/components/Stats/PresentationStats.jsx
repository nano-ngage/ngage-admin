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
      stats: null,
      maxy: 0,
      optionsState: -1,
      title: ''
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
    if (!this.props.user && nextProps.user) {
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
      var index = e.target.selectedIndex;
      this.setState({title:e.target[index].text});
      getPresentationStats(e.target.value).then(stats => {
        this.setState({stats});
        var max = 0;
        for(var i = 0; i < stats.length; i++) {
          max = Math.max(stats[i].responses, max);
        }
        this.setState({maxy:max});
      })
    } else {
      this.setState({stats:null})
    }
    this.setState({optionsState:index});

  }
  render() {
    return (
      <div >
        <select value={this.state.optionsState} onChange={this.handleChange}>
          <option value="-1">Please select a presentation</option>
          {this.state.presentations.map(presentation => <option value={presentation.presentationID}>{presentation.title}</option>)}
        </select>
        {(this.state.stats && this.state.stats.length > 0) ? (
          <div>
            <h1 className="presentationTitle">{this.state.title}</h1>
            <svg className="graph zoom" aria-labelledby="title" role="img">
              <g className="grid x-grid" id="xGrid">
                <line x1="90" x2="90" y1="5" y2="371"></line>
              </g>
              <g className="grid y-grid" id="yGrid">
                <line x1="90" x2="830" y1="370" y2="370"></line>
              </g>
                <g className="labels x-labels">
                {this.state.stats.map((stat, index) => <text className="x-axis" x={index*30 + 100} y="400">{stat.createdAt.toString().substring(0, 5)}</text>)}
                <text x="440" y="440" className="label-title">Presentation Date</text>
              </g>
              <g className="labels y-labels">
                <text x="80" y="15">{this.state.maxy}</text>
                <text x="80" y="131">{Math.floor(this.state.maxy * 2 / 3)}</text>
                <text x="80" y="248">{Math.floor(this.state.maxy * 1 / 3)}</text>
                <text x="80" y="373">0</text>
                <text x="50" y="270" className="label-title-x">Responses / Participants</text>
              </g>
              <g className="data" data-setname="Responses">
                <circle cx="850" cy="30" r="4"></circle>
                <text x="860" y="35">Responses</text>
                {this.state.stats.map((stat, index) => <circle cx={index*30 + 100} cy={371 - Math.floor(358 * stat.responses/this.state.maxy)} data-value={stat.responses} r="4"></circle>)}
              </g>
              <g className="data2" data-setname="Participants">
                <circle cx="850" cy="50" r="4"></circle>
                <text x="860" y="55">Participants</text>
                {this.state.stats.map((stat, index) => <circle cx={index*30 + 100} cy={371 - Math.floor(358 * stat.participants/this.state.maxy)} data-value={stat.participants} r="4"></circle>)}
              </g>
            </svg>
          </div>
          ) : <div/>}

      </div>
    );
  }
}

export default PresentationStats;

// // a
//           <svg viewBox="0 0 500 100" class="chart">
//             <polyline
//                fill="none"
//                stroke="#0074d9"
//                stroke-width="3"
//                points={this.state.stats.map((stats, index) => {return index*20 + ',' + stats.responses + ' '}).join('')}/>
//             <polyline
//                fill="none"
//                stroke="#be0000"
//                stroke-width="3"
//                points={this.state.stats.map((stats, index) => {return index*20 + ',' + stats.participants + ' '}).join('')}/>
//           </svg>
//            <text x="100" y="400">2008</text>
            // <text x="246" y="400">2009</text>
            // <text x="392" y="400">2010</text>
            // <text x="538" y="400">2011</text>
            // <text x="684" y="400">2012</text>
                        // <circle cx="90" cy="192" data-value="7.2" r="4"></circle>
            // <circle cx="240" cy="141" data-value="8.1" r="4"></circle>
            // <circle cx="388" cy="179" data-value="7.7" r="4"></circle>
            // <circle cx="531" cy="200" data-value="6.8" r="4"></circle>
            // <circle cx="677" cy="104" data-value="6.7" r="4"></circle>