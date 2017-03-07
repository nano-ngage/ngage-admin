import Inferno from 'inferno';
import Component from 'inferno-component';

import GroupStats from './GroupStats.jsx';
import UserStats from './UserStats.jsx';
import PresentationStats from './PresentationStats.jsx';
import ParticipationStats from './ParticipationStats.jsx';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'groupStats'
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(e) {
    e.preventDefault();
    this.setState({view: e.target.id});
  }

  render() {
    return (
      <div>
        <div className="row">
          <button className={this.state.view === 'groupStats' ? 'button' : 'statsView'}  onClick={this.changeView} id="groupStats">Group Stats</button>
          <button className={this.state.view === 'participationStats' ? 'button' : 'statsView'} onClick={this.changeView} id="participationStats">Participation Stats</button>
          <button className={this.state.view === 'presentationStats' ? 'button' : 'statsView'} onClick={this.changeView} id="presentationStats">Presentation Stats</button>
          <button className={this.state.view === 'userStats' ? 'button' : 'statsView'}  onClick={this.changeView} id="userStats">Session Stats</button>
        </div>
        <div>
          {this.state.view === 'groupStats' ? (<GroupStats user={this.props.user}/>) : 
            this.state.view === 'userStats' ? (<UserStats user={this.props.user}/>) : 
            this.state.view === 'presentationStats' ? (<PresentationStats user={this.props.user}/>) : 
            (<ParticipationStats user={this.props.user}/>)}
        </div>
      </div>
    );
  }
}

export default Stats;
