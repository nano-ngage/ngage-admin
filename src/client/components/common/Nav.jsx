import Inferno from 'inferno';
import { Link } from 'inferno-router';

export default function Nav(props) {
  let logger;
  if (props.user) {
    logger = [<li><Link to="/" className='navLink' >Home</Link></li>,
      <li><Link to="/presentations" className='navLink'>Presentations</Link></li>,
      <li><Link to="/groups"  className='navLink'>Groups</Link></li>,
      <li><Link to="/statistics"  className='navLink'>Statistics</Link></li>,
      <li><Link to="/logout" className='navLink'>Logout</Link></li>
    ]
  } else {
    logger = [<li><Link to="login" className='navLink'>Login</Link></li>, <li><Link to="login" className='navLink'>Sign up</Link></li>]
  }
  return (
    <div className='navbg'>
      <div className='navContainer'>
        <header className='navHeader'>
          <img src="http://i63.tinypic.com/15czuvc.png" className="navimg" />
          <h1><Link to="/" className='navLogo'>ngage</Link></h1>
        </header>
        <nav>
          <ul className='navul'>
            {logger}
          </ul>
        </nav>
      </div>
    </div>
  )
}
