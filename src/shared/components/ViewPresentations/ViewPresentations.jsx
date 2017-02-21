import Inferno from 'inferno';
import Component from 'inferno-component';
import ViewPpt from './ViewPpt.jsx';

class ViewPresentations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      ppts: [{presentationID: 0, title: 'Presentation Title'}, {presentationID: 0, title: 'Presentation Title'}, {presentationID: 0, title: 'Presentation Title'}, {presentationID: 0, title: 'Presentation Title'}]
    };

    this.deletePpt = this.deletePpt.bind(this);
  }

  componentDidMount() {
    //  FETCH USER'S PRESENTATIONS
    // myAPI.fetch('/item-names').then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  deletePpt(pid) {
    var ppts= [];
    this.state.ppts.forEach((ppt, index) => {
      if (ppt.presentationID !== pid) {
        ppts.push(ppt);
      }
    });
    this.setState({ppts: ppts});
    // fetch('/deleteQ', {
    //   method: "DELETE",
    //   body: {questionID: qid}
    //   }).then((data) => {
    //   this.setState({
    //     data
    //   });
    // });
  }

  render() {
    return (
      <div className="container">
      <p className="presentation">&nbsp;View Presentations:</p>
      <div className="viewContainer">
        {this.state.ppts.map((ppt, index) => {
            return (
              <ViewPpt ppt={ppt} key={index} delete={this.deletePpt} />
            )
          })
        }
      </div>
      </div>
    );
  }
}

export default ViewPresentations;
