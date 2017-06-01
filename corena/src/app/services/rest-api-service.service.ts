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
export class RestApiServiceService {

  /**
   * constructor to inject
   * dependencies needed at runtime
   * @param http
   */
  constructor(private http: Http, /*private requestMethod: RequestMethod*/) {
  }

  // objectList: Object[];


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
