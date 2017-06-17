import {Injectable} from '@angular/core';
import {Http, RequestMethod, Response, Headers, RequestOptions} from '@angular/http';

import * as Constants from '../shared/constants.globals';

import {Observable} from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/map';


/**
 * generic http call service
 * supported by Observables
 */
@Injectable()
export class RestApiService {

  headers: Headers;
  public url1:string;
  public url2:string;
  public comm_obj: {} = {};
  public additionParameter: number;
  public additionParameterKey: string;
  public uploadServiceName: string;

  /**
   * constructor to inject
   * dependencies needed at runtime
   * @param http
   */
  constructor(private http: Http /*private requestMethod: RequestMethod*/) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  // objectList: Object[];
  postRequest(url, body): Observable<any> {
    console.log(body);
    console.log(url);
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
    console.log(url);
    return this.http.get(url, this.headers);
  }

  putRequest(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete(url);
  }

  /**
   * function returns and Observable
   * after joining 2 streams of data
   * @param url1
   * @param url2
   * @returns {any}
   */
  getObservableFJ(url1: string, url2: string): Observable<any> {
    return Observable.forkJoin(
      this.http.get(url1).map((res: Response) => res.json().data),
      this.http.get(url2).map((res: Response) => res.json().data)
    );
  }

  search(url: string): Observable<{}[]> {
    // this.url='http://49.50.76.29/api/material/search?search=' + term + '&filter[]=name&filter[]=srno&filter[]=brand'
    console.log("search")
    console.log(url)
    return this.http
      .get(url)
      .map(response => response.json().data as {}[]);
  }

  getLength(url: string): Observable<number> {
    // this.url='http://49.50.76.29/api/material/search?search=' + term + '&filter[]=name&filter[]=srno&filter[]=brand'
    console.log("length")
    console.log(url)
    return this.http
      .get(url)
      .map(response => response.json().total as number);
  }

  getObs(): Observable<{}[]> {
    console.log(this.url1)
    return this.http
      .get(this.url1)
      .map(response => response.json().data as {}[]);
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
    /**
   * to set the value
   * @param key
   * @param id
   */
  setAdditionalParameter(key: string, id: number): void {
    this.additionParameter = id;
    this.additionParameterKey = key;
  }
   /** *
   * @param service_name upload file to
   */
  setUploadServiceName(service_name) {
    this.uploadServiceName = service_name;
  }

  /**
   *
   * @returns {[string]}
   */
  getAdditionParameter(): any {
    return [this.additionParameterKey, this.additionParameter];
  }

  getUploadServiceName(): string{
    return this.uploadServiceName;
  }


}
