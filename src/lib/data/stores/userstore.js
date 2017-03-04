
import authUtils from 'util/auth'
import { store, cookie } from 'util/storage'

export class UserStore {
  user = null; // current user

  constructor() {
  }
  
  setCurrentUser(user) {
    this.user = user;
    // Also save in local storage
    // Todo: move this out to an auxiliary storage mechanism
    cookie('user', user);
    store('user', user);
  }

  getCurrentUser() {
    if (this.user)
      return this.user;

    var user = cookie('user') || store('user');
    this.user = JSON.parse(user);
    
    return this.user;
  }
}

export let userStore = new UserStore();
