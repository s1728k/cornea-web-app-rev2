import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {LoginCredentials} from '../model/class/LoginCredentials';
import {Http, RequestMethod, Response, Headers, RequestOptions} from '@angular/http';
import {RestApiService} from '../services/rest-api-service.service';
import * as Constants from '../shared/Constants';
import {User} from '../model/interface/User';
import {StorageService} from '../services/local-storage.service';
import {subscribeOn} from 'rxjs/operator/subscribeOn';
import {Subscription} from 'rxjs/Subscription';
import {UserResponse} from '../model/interface/user-response';
import {RouterModule, Router, Routes} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url: string;
  loggeddInUser: User;
  cred: LoginCredentials;

  constructor(private sharedService: SharedService,
              private http: Http,
              private restApiService: RestApiService,
              private storageService: StorageService,
              private routes: Router) {
    this.cred = new LoginCredentials();
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    console.log('email = %s \n password = %s', email, password);
    this.cred.password = password;
    this.cred.email = email;
    this.url = Constants.LOGIN_END_POINT;
    console.log(' email=%s \n password=%s \n url=%s ', this.cred.email, this.cred.password, this.url);
    this.restApiService.postRequest(this.url, this.cred)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data.user)
      .subscribe(
        (value: User) => {
          this.storageService.setUserData(value);
          this.loggeddInUser = value;
          if (this.loggeddInUser.email === email) {
            this.routes.navigate(['/pages']);
          }
        },
        (err: any) => {
          console.error(err);
        }
      );


    console.log('data returned %s', this.loggeddInUser);
  }

}
