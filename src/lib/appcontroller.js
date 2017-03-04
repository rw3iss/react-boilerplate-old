import EventBus from 'eventbusjs'
import auth from 'lib/util/auth'
import { route } from 'preact-router'

// Does app-wide things like error handling, view orchestration, etc

class AppController {
	constructor() {
		this.onAppInit = this.onAppInit.bind(this);
		this.onAppError = this.onAppError.bind(this);
		EventBus.addEventListener('APP_INIT', this.onAppInit);
		EventBus.addEventListener('APP_ERROR', this.onAppError);
	}

	loadUserData() {
		if (auth.loggedIn()) {
			// Will load user from cookie or local storage
			var user = auth.getCurrentUser();

			if (user) {
				// Now load user's data
			}
		}
	}

	// bootstraps the apps, sets up app-wide events
	onAppInit(e) {
		var self = this;

		self.loadUserData();

	    EventBus.addEventListener("USER_LOGGED_IN", function(r) {
	      self.loadUserData();
	    });
	
		// On needs login, we ask the current view if it can handle a redirect to the login page.	    
		EventBus.addEventListener("APP_NEEDS_LOGIN", function(r) {
			auth.logout();
	  		route('/login');
	  		// TODO: ask current component if it can transition (ie. has unsaved changes)
		});

		// Todo: set an interval to make sure we're "logged in"?
	}

	onAppError(e) {
		if(e.target.type == 'connection') {
			alert("Connection error.");
		}
	}
}

let appController = new AppController();
module.exports = appController;