import Inferno from 'inferno';
import Component from 'inferno-component';

var statsURL = `http://${STATSIP}:${STATSPORT}`;
function getParticipationStats(userID, groupID) {
  return fetch(statsURL + '/participationStats/' + userID,{
      method: 'GET',
      mode: 'CORS',
      headers: {'Content-Type': 'application/JSON'}
      }).then(data => data.json());
}

function getData(node, total) {
  return {
    size: 230,
    sectors: [
        {
            percentage: ((node['1.0'] || 0)/total),
            label: '1.0'
        },
        {
            percentage: ((node['0.8'] || 0)/total),
            label: '0.8'
        },
        {
            percentage: ((node['0.6'] || 0)/total),
            label: '0.6'
        },
        {
            percentage: ((node['0.4'] || 0)/total),
            label: '0.4'
        },
        {
            percentage: ((node['0.0'] || 0)/total),
            label: '0.0'
        }
    ]
  }
}

function calculateSectors( data ) {
    var sectors = [];
    var colors = [
        "#61C0BF", "#DA507A", "#BB3D49", "#DB4547", "blue"
    ];

    var l = data.size / 2
    var a = 0 // Angle
    var aRad = 0 // Angle in Rad
    var aCalc = 0;
    var arcSweep = 0;
    var z = 0 // Size z
    var x = 0 // Side x
    var y = 0 // Side y
    var X = 0 // SVG X coordinate
    var Y = 0 // SVG Y coordinate
    var R = 0 // Rotation

    data.sectors.map( function(item, key ) {
        a = 360 * item.percentage;
        a = (a === 360) ? 359.99 : a;
        aCalc = ( a > 180 ) ? 360 - a : a;
        // aCalc = a;
        aRad = aCalc * Math.PI / 180;
        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }
        
        y = Math.sqrt( z*z - x*x );
        Y = y;

        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }

        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            large: (a > 180) ? 1 : 0,
            L: l,
            X: X,
            Y: Y,
            R: R
        });

        R = R + a;
    })


    return sectors
} 


class ParticpationStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null,
      selectDate: '1900-01-01',
      sliderPos: -1,
      pieChart: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.setChart = this.setChart.bind(this);
  }
  componentDidMount() {
    var that = this;
    if (this.props.user && !this.state.stats) {
      getParticipationStats(this.props.user.userID)
      .then(data => { 
        this.setState({stats: data, selectDate: data[data.length-1].createdAt, sliderPos: data.length-1}, () => {
          that.setChart(data.length-1);
        });
       })
      .catch(error => { console.log('unknown error loading participation data.. refresh'); });
    }
  }
  setChart(val) {
    var curStat = this.state.stats[val];
    var total = 0 + curStat['0.0'] + curStat['0.4'] + curStat['0.6'] + curStat['0.8'] + curStat['1.0'];
    this.setState({selectDate: curStat.createdAt, sliderPos: val, pieChart:calculateSectors(getData(curStat, total))});

  }
  handleChange(e) {
    this.setChart(e.target.value);
  }
  render() {
    return (
      <div >
        {this.state.stats ? (
          <div className="buttonMenu">
            <input onChange={this.handleChange} type="range" min="0" max={this.state.stats.length - 1} />
            <div>{this.state.selectDate}</div>
          </div>
          ) : <div>Loading...</div>}
        {
          (this.state.sliderPos !== -1 && this.state.pieChart) ? (
              <div>
                <svg style="width: 230px; height: 230px;">
                {this.state.pieChart.map(sector => <path fill={sector.color} d={'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 1 ' + sector.large + ',1 ' + sector.X + ', ' + sector.Y + ' z'} transform={'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')'}></path>)}
                </svg>
              </div>
            ) : (<div>Loading...</div>)
        }
      </div>
    );
  }
}

export default ParticpationStats;