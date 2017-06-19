import {Injectable, Inject}    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from 'angular-2-local-storage';
import {isNull} from "util";
// import {Observable} from "rxjs/Observable";
// Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class CRUDService/* <T, T1>*/ {

   private headers = new Headers({'Content-Type': 'application/json'});

  // private options = new RequestOptions({ headers: this.headers });
  public url: string;
   apiToken : string;// URL to web api
  //private url = 'http://192.168.0.205:9000/api/indent/all?conditions[status]=draft&page=0&perPage=20';
  constructor(public http: Http,
              public localStorageService: LocalStorageService) {
    if (this.localStorageService.get('api_token') != null){
       this.apiToken =  this.localStorageService.get('api_token').toString();
      this.headers.append('Authorization', this.apiToken);
    }
  }

  /*postRequest(request:Object):Observable<T1>{
   return this.http.post(this.url, request,this.options)
   .map((res:Response) => Observable<T1>res.json())
   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }*/

  getObjs(): Promise<{}[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as {}[])
      .catch(this.handleError);

  }

  getObj(): Promise<{}> {
    //const url = `${this.boqUrl}/${id}`;
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as {})
      .catch(this.handleError);
  }

  getObjLength(): Promise<number> {
    //const url = `${this.indentUrl}${0}${'&perPage=10'}`;
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().total as number)
      .catch(this.handleError);
  }

  delObj(): Promise<void> {
    //const url = `${this.boqUrl}/${id}`;
    return this.http.delete(this.url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  newObj(obj: any): Promise<{}> {
    //this.url="http:/192.168.0.205:9000/api/indent/new";
    return this.http
      .post(this.url, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as {})
      .catch(this.handleError);
  }

  modObj(obj: any): Promise<{}> {
    //const url = `${this.boqUrl}/${obj.id}`;
    return this.http
      .put(this.url, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(() => obj)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // mapObj(objD:{}={},objS:{}={}):{}{
  //   for (let key of Object.keys(objS)){
  //     objD[key]=objS[key];
  //   }
  //   return objD
  // }

  // temp:{}[]=[]
  // t:any;
  // repKey(objD:{}[]=[],objS:{}[]=[]):{}[]{
  //   const newArray = objS.map(o => {
  //     return { name: o['name'], courseid: o['courseid'] };
  //   });
  //   return this.temp
  // }

  loadMr: {} = {};
  loadRfq: {} = {};
  loadSq: {} = {};
  loadPo: {} = {};
  loadSupp: {} = {};

  loadRfqFun(): void {
    this.loadRfq['itemBucket']
  }

  poFrom: {} = {'type': 'new'};

  newPo: {} = {
    'status': "Not Saved",
    'po_type': "",
    'date': Date,
    'project_id': 2,
    'site_id': 4,
    'indented_by': 2,
    'message_for_supplier': "fsdf",
    'terms_and_conditions': "dsf",
  };

}
