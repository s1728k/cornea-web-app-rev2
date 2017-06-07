import {Injectable} from '@angular/core';
import {Http, RequestMethod, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Constants from '../shared/Constants';
/**
 * generic http call service
 * supported by Observables
 */
@Injectable()
export class RestApiService {

  headers: Headers;

  /**
   * constructor to inject
   * dependencies needed at runtime
   * @param http
   */
  constructor(private http: Http /*private requestMethod: RequestMethod*/) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  // objectList: Object[];
  postRequest(url: string, body: any): Observable<any> {
    // console.log(this.http.post(url, body, this.headers));
    return this.http.post(url, body, this.headers);
    // .catch((err:any)=> console.log(err));
  }

  /**
   * get request is handled
   * in this function
   * @param url
   * @returns {Observable<Response>} generic observables
   */
  getRequest(url: string): Observable<any> {
    return this.http.get(url);
  }

  putRequest(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete(url);
  }

  // makeHttpReuqest(method: string, url: string, body: any): Observable<any> {
  //
  //   if (method === Constants.POST_METHOD) {
  //
  //   } else if (method === Constants.GET_METHOD) {
  //
  //   } else if (method === Constants.PUT_METHOD) {
  //
  //   } else if (method === Constants.DELETE_METHOD) {
  //
  //   } else {
  //     return null;
  //   }
  // }


  /*/!**
   * method used for making post request
   * using observables and rx.js functionality
   * @param body data to be sent to server on post request
   * @param url address for api on web
   * @returns {Observable<R|T>} Observables as return type
   *!/
   postMethod(body: T, url: string): Observable {
   return this.http.post(url, body)
   .map((res: Response) => res.json().data as returnT[])
   ._catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   getRequest(url: string): Observable<T> {
   return this.http.get(url)
   .map((res: Response) => res.json().data as T[])
   .catch((error: any) => Observable.throw(error.json().error || 'error returned '));
   }
   */
}
