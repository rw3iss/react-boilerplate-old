import { h, Component } from 'preact';
import { Router, browserHistory, route } from 'preact-router';
import { store, cookie } from './../lib/util/storage'
import EventBus from 'eventbusjs'
import auth from 'lib/util/auth'

import appController from 'lib/appcontroller';

/* Pages + Global Components */
import Header from './shared/header';
import Home from './views/home';
import Login from './views/login';
import Loginprompt from './shared/loginprompt';

import style from './style';

export default class App extends Component {

	// Todo: move app login to some global bootstrap component?

	constructor() {
		super();
		var self = this;

		EventBus.dispatch("APP_INIT");

		this.requireAuth = this.requireAuth.bind(this);
		this.handleRoute = this.handleRoute.bind(this);
		// Load user info from local store or cookies
	}

	handleRoute(e) {
		if (typeof e.current.attributes.onEnter != 'undefined') {
			e.current.attributes.onEnter();
		} else {
			// no guard, so remove login prompt if active
	  		EventBus.dispatch("HIDE_LOGIN");
		}
		this.currentUrl = e.url;
	}

	requireAuth(e) {
	  if (!auth.loggedIn()) {
	  	EventBus.dispatch("APP_NEEDS_LOGIN");
	  	route('/login');
	    // replace({
	    //   pathname: '/login',
	    //   //state: { nextPathname: nextState.location.pathname }
	    // })
	  } else {
	  }
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Loginprompt />
				
				<div class={style.view}>
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Login path="/login" onEnter={this.requireAuth} />
					</Router>
				</div>
			</div>
		);
	}
}
