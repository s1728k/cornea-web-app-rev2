import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {RateAnalysis, LineItemTableRow} from '../model/class';
import {LineItem} from '../model/class/line-item.model';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
// import {RaPopupDialog} from './rapopup.component';


import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';


@Component({
  selector: 'app-cf',
  templateUrl: './cf.component.html',
  styleUrls: ['./cf.component.css']
})

export class CfComponent implements OnInit {

  subMaterials:{}[]=[]
  materialsList: {}[];
  private materials: Observable<{}[]>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private restApiService: RestApiService, private _http: Http) { }

  ngOnInit() {
      this.materials = this.searchTerms
        /*.debounceTime(300)        // wait 300ms after each keystroke before considering the term
         .distinctUntilChanged()*/   // ignore if next search term is same as previous
          .switchMap(term => this.restApiService.search(term))
          .catch(error => {console.log(error); return Observable.of<{}>([]);});
  }

  search(term1: string, cnd: string): void {
    this.searchTerms.next(term1);
    this.restApiService.getRequest('http://49.50.76.29/api/material/search?search='
      + term1 + '&filter[]=name&filter[]=srno&filter[]=brand' + cnd)
      .map(res => res.json().data)
      .subscribe(
        (value) => {this.materialsList=value;},
        (err: any) => console.log(err)
      );
  }

  addSubMaterial({}={}) {
    this.subMaterials.push({});
  }

  delSubMaterial(i) {
    this.subMaterials.splice(i, 1);
  }

  updateRow(material,i) {
      this.subMaterials[i]['uom']=material['uom'];
      this.subMaterials[i]['price']=material['rate'];
      this.subMaterials[i]['srno']=material['srno'];
  }

}