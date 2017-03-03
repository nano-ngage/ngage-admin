import Inferno from 'inferno';
import Component from 'inferno-component';

import GroupStats from './GroupStats.jsx';
import UserStats from './UserStats.jsx';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'groupStats'
    }
    this.changeView = this.changeView.bind(this);
  }
  componentDidMount () {
    
  }

  changeView(e) {
    e.preventDefault();
    this.setState({view:e.target.id})
  }
  render() {
    return (
      <div>
        <div className="buttonMenu">
          <button className="button" onClick={this.changeView} id="groupStats">Group Stats</button>
          <button className="button" onClick={this.changeView} id="userStats">User Stats</button>
        </div>
        <div>
          {this.state.view === 'groupStats' ? (<GroupStats user={this.props.user}/>) : (<UserStats user={this.props.user}/>)}
        </div>
      </div>
    );
  }
}

export default Stats;
