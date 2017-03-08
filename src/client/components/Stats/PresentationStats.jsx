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

class PresentationStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
      stats: null,
      maxy: 0,
      optionsState: '  Please select a presentation',
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
      .then(presentations => { 
        this.setState({presentations});
       })
      .catch(error => { console.log('unknown error loading presentation data.. refresh'); });
    }
  }
  handleChange(e) {
    e.preventDefault();
    var option = e.target.value;
    this.setState({stats: 'loading'});
    if (e.target.value != -1) {
      var index = e.target.selectedIndex;
      this.setState({title: e.target[index].text});
      getPresentationStats(e.target.value).then(stats => {
        this.setState({stats: stats});
        var max = 0;
        for(var i = 0; i < stats.length; i++) {
          max = Math.max(stats[i].responses, max);
          // leftt side scale - > right scale 0-1
        }
        this.setState({maxy:max});
        this.setState({stats: stats});
      })
    } else {
      this.setState({stats:null})
    }
    this.setState({optionsState: option});
  }

  render() {
    return (
      <div>
      <div className="row">
        <select onChange={this.handleChange} className="styled-select slate" value={this.state.optionsState} >
          <option value="-1">&nbsp; Please select a presentation</option>
          {this.state.presentations.map(presentation => <option value={presentation.presentationID}>&nbsp; {presentation.title}</option>)}
        </select>
        </div><div className="row">
        {(this.state.stats === 'loading') ? <div><img src="http://i66.tinypic.com/2qvw0ax.gif" /><p className="loadingText">Loading...</p></div> : 
        (this.state.stats && this.state.stats.length > 0 && (typeof this.state.stats !== 'string')) ? (
          <div>
            <h1 className="presentationTitle">{this.state.title}</h1><br/>
            <svg className="graph zoom" aria-labelledby="title" role="img">
              <g className="grid x-grid" id="xGrid">
                <line x1="90" x2="90" y1="5" y2='371'></line>
              </g>
              <g className="grid y-grid" id="yGrid">
                <line x1="90" x2={this.state.stats.length*30 + 85} y1="5" y2="5"></line>
              </g>
              <g className="grid y-grid" id="yGrid">
                <line x1="90" x2={this.state.stats.length*30 + 85} y1="370" y2="370"></line>
              </g>
              <g className="grid y-grid" id="yGrid">
                <line x1={this.state.stats.length*30 + 85}  x2={this.state.stats.length*30 + 85} y1="5" y2='371'></line>
              </g>
                <g className="labels x-labels">
                {this.state.stats.map((stat, index) => <text className="x-axis" x="-398" y={index*(30) + 105}>{stat.createdAt.toString().substring(0, 5)}</text>)}
                <text x={this.state.stats.length*15 + 100}  y="440" className="label-title">Presentation Date</text>
              </g>
              <g className="labels y2-labels">
                <text x={this.state.stats.length*30 + 90} y="15">100%</text>
                <text x={this.state.stats.length*30 + 90} y="131">75%</text>
                <text x={this.state.stats.length*30 + 90} y="248">25%</text>
                <text x={this.state.stats.length*30 + 90} y="373">0%</text>
                <text x='130' y={this.state.stats.length*(-30) - 133} className="label-title-x2">Response Rate</text>
              </g>
              <g className="labels y-labels">
                <text x="80" y="15">{this.state.maxy}</text>
                <text x="80" y="131">{Math.floor(this.state.maxy * 2 / 3)}</text>
                <text x="80" y="248">{Math.floor(this.state.maxy * 1 / 3)}</text>
                <text x="80" y="373">0</text>
                <text x="-93" y="41" className="label-title-x">Responses / Participants</text>
              </g>
              <g className="data" data-setname="Responses">
                <circle cx={this.state.stats.length*28 - 10}  cy="30" r="5"></circle>
                <text x={this.state.stats.length*28}  y="35">Responses</text>
                {this.state.stats.map((stat, index) => <circle cx={index*30 + 100} cy={371 - Math.floor(358 * stat.responses/this.state.maxy)} data-value={stat.responses} r="5"></circle>)}
              </g>
              <g className="data2" data-setname="Participants">
                <circle cx={this.state.stats.length*28 - 10} cy="50" r="5"></circle>
                <text x={this.state.stats.length*28}  y="55">Participants</text>
                {this.state.stats.map((stat, index) => <circle cx={index*30 + 100} cy={371 - Math.floor(358 * stat.participants/this.state.maxy)} data-value={stat.participants} r="5"></circle>)}
              </g>
                <g className="data3" data-setname="Participants">
                <circle cx={this.state.stats.length*28 - 10} cy="70" r="5"></circle>
                <text x={this.state.stats.length*28}  y="73">Response Rate</text>
                {this.state.stats.map((stat, index) => <circle cx={index*30 + 100} cy={371 - Math.floor(358 * stat.responses/((stat.participants || 1000)*stat.questions))} data-value={stat.participants} r="5"></circle>)}
              </g>
            </svg>
          </div>
          ) : (Array.isArray(this.state.stats) && this.state.stats.length === 0) ? <p className="loadingText">There is no data for this presentation</p> : <div/>}

      </div>
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