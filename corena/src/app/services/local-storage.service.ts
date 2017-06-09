import {Injectable} from '@angular/core';
// dependency for local storage with config
import {LocalStorageService} from 'angular-2-local-storage';
// importing user model interface to use here
import {User} from '../model/interface/User';
// importing constants class to get stored keys
import * as Constants from '../shared/constants.globals';
import {UserResponse} from '../model/interface/user-response';

/**
 * Service class will hold all the data that has to be hosted
 * on local storage of device for use
 */
@Injectable()
export class StorageService {

  constructor(private localStorageInstance: LocalStorageService) {
  }

  /**
   * method to store all user data in local storage
   * @param user
   */
  setUserData(user: User) {
    console.log(user);
    this.localStorageInstance.set(Constants.USER_OBJECT, user);
  }

  getValueWithKey(key: string): any {
    return this.localStorageInstance.get(key);
  }

  clearLocalStorage() {
    this.localStorageInstance.clearAll();
  }
}
