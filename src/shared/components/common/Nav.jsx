import Inferno from 'inferno';
import { Link } from 'inferno-router';

export default function Nav(props) {
  return (
    <div className='navbg'>
      <div className='navContainer'>
        <header className='navHeader'>
          <img src="http://i63.tinypic.com/15czuvc.png" />
          <h1><Link to="/" className='navLogo'>ngage</Link></h1>
        </header>
        <nav>
          <ul className='navul'>
            <li><Link to="/" className='navLink' >Home</Link></li>
            <li><Link to="/view" className='navLink'>View</Link></li>
            <li><Link to="/create/0"  className='navLink'>Create</Link></li>
            <li><Link to="/logout" className='navLink'>Logout</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
