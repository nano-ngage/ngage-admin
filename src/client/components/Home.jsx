import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Home extends Component {
  render() {
    return (
      <div>
    <div className="row">
      <img src='http://i66.tinypic.com/2wfi6vc.jpg' />
    </div>
    <div className="row">
      <div className="column">
        <p className="header">What is nGage?</p>
        <br />
        nGage is your go-to presentation app that enhances audience participation. With nGage, you can:
        <br /><br />
        <ul className="indent">
          <li>Plan engagement in your presentation with questions you can ask in real-time</li>
          <li>Audience participation only requires a mobile device with internet</li>
          <li>Automatically track audience engagement statistics for any given presentation long-term</li>
        </ul>
        <br />
        <p className="header">The Problem</p>
        <br />
        They key to a successful presentation -- whether it be a lecture-style classroom setting, a workshop you facilitate, or large-scale company reports -- is audience engagement. And the best way to refine your presentation with engagement in mind is feedback from the audience. Getting feedback to improve your presentation is no easy task, especially since the last thing an audience wants to do is fill out a survey at the end.
        <br /><br />
        <p className="header">The Solution</p>
        <br />
        With nGage, you can plan your presentation with interative questions, conceptual discussions, or "thumbs checks" and accumulate engagement statics automatically -- % of total answers for a given prompt, response frequency to a particular question, or (if you have a consistent audience over time), participant-specific answers and trends.
        <br /><br /><br /><br />
      </div>
      <div className="column">
        <p className="header">How to Get Started</p>
        <br />
        <b>Sign up</b>
        <ul className="indent">
          <li>If you are a presenter, create an account here and specify you are a "presenter".</li>
          <li>If you expect a consistent audience, create audience accounts for each of your participants here.</li>
        </ul>
        <br />
        <b>Crafting your presentation questions</b>
        <ul className="indent">
          <li>Navigate to your dashboard and create a new presentation</li>
          <li>Add your interactive questions and save it</li>
        </ul>
        <br />
        <b>While presenting</b>
        <ul className="indent">
          <li>
            With your phone, select your saved presentation to generate a new room. This will generate a unique room code that you must share with your audience.
          </li>
          <li>Set up a separte computer to show the presentation view (i.e. a projector)</li>
          <li>With your phone, you can see a list all of the questions you made. When you are ready to ask your audience, select it and it will display it on the presentation view.</li>
        </ul>
      </div>
    </div>
  </div>
    );
  }
}
