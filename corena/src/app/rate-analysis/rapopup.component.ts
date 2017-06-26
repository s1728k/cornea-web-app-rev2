import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {LabourRateAnalysis} from "../model/class/labour-rate-analysis.model";
import {RestApiService} from '../services/rest-api-service.service';

// models used
import {Labour} from '../model/class/labour.model'

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {DialogService} from "../shared/services/dialog/dialog.service";

@Component({
  selector: 'app-rapopup',
  templateUrl: './rapopup.component.html',
  styleUrls: ['./rapopup.component.css'],
  providers: [DialogService]
})
export class RaPopupDialog implements OnInit {

  labours: Observable<Labour[]>;
  labourSuggestion: Subject<string> = new Subject<string>();

  labour_total: number = 0;
  labrRateAnalysis: LabourRateAnalysis;
  labourRateAnalysis: LabourRateAnalysis[] = [];

  constructor(private restApiService: RestApiService, public dialogRef: MdDialogRef<RaPopupDialog>, private dialogsService: DialogService) {
  }

  ngOnInit() {
    this.labours = this.labourSuggestion
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Labour[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Labour[]>([]);
      });
  }

  searchLabours(term: string) {
    console.log("Entered searchMaterials")
    const url = "http://49.50.76.29/api/labour/search?search=" + term + "&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate"
    this.labourSuggestion.next(url);
  }

  addRow({} = {}) {
    this.labrRateAnalysis = new LabourRateAnalysis();
    this.labourRateAnalysis.push(this.labrRateAnalysis)
  }

  deleteRow(i) {
    this.labourRateAnalysis.splice(i, 1);
  }

  updateRow(labour, j) {
    console.log("Entered updateRow")
    console.log(labour);
    this.labourRateAnalysis[j]['uom'] = labour['uom'];
    this.labourRateAnalysis[j]['rate'] = labour['rate'];
    this.labourRateAnalysis[j]['lineItem_labour_id'] = labour['id'];
  }

  calc(i) {
    this.labour_total = 0
    this.labourRateAnalysis[i]['amount'] = this.labourRateAnalysis[i]['breadth'] *
      this.labourRateAnalysis[i]['thickness'] *
      this.labourRateAnalysis[i]['rate'];
    this.labour_total = this.labour_total + this.labourRateAnalysis[i]['amount'];
  }
}

// import { Component, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

// @Component({
//   selector: 'app-mail',
//   templateUrl: './mail-modal.component.html',
//   styleUrls: ['./mail-modal.component.css']
// })
// export class MailDialog implements OnInit{

//     newMail:{}={};
//     constructor(public dialogRef: MdDialogRef<MailDialog>) {}

//     ngOnInit(){

//     }

// }
