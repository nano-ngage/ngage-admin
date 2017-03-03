import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import { getLogin } from './authHelper';
import Auth0Lock from 'auth0-lock';


export default class AuthService extends EventEmitter {
  constructor(clientId, domain, handleUser) {
    super();
    this.handleUser = handleUser;
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
          redirect: false,
          responseType: 'token'
        },
       autoclose: true,
       theme: {
         logo: 'http://i68.tinypic.com/2n7odg.png',
         primaryColor: '#2f4961'
       }  
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.show = this.show.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    window.localStorage.setItem('id_token', authResult.idToken)

    // Async loads the user profile data
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.loginUser(profile);
        window.browserHistory.push('/');
        window.localStorage.setItem('profile', JSON.stringify(profile))
        this.emit('profile_updated', profile)
      }
    })
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  show() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem('id_token');
    return !!token && !isTokenExpired(token)
  }

  loginUser(profile) {
    profile.auth_id = profile.user_id;
    getLogin(profile).then(user => {
      window.localStorage.setItem('user', JSON.stringify(user));
      this.handleUser(user);
    })
  }
}
