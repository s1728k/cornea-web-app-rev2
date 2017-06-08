import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';

@Injectable()
export class SearchService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {
    // var search = new URLSearchParams()
    // search.set('action', 'opensearch');
    // search.set('search', term);
    // search.set('format', 'json');
    // return this.jsonp
    //             .get("http://49.50.76.29/api/material/search?search=" + term + "&filter[]=name&filter[]=srno&filter[]=brand", { search })
    //             .toPromise()
    //             .then((response) => response.json().data);
  }
}