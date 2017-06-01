import {Injectable} from '@angular/core';
import {Http, RequestMethod, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestApiServiceService<T, returnT> {
  url: string;

  constructor(private http: Http) {
  }

  postMethod(body: T, url: string): Observable<returnT> {
    return this.http.post(url, body)
      .map((res: Response) => res.json().data as returnT[])
      ._catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRequest(url: string): Observable<T> {
    return this.http.get(url)
      .map((res: Response) => res.json().data as T[])
      .catch((error: any) => Observable.throw(error.json().error || 'error returned '));
  }

}
