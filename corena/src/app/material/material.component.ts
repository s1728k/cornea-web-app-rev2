import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// ------models used-----------------
import {Material} from '../model/class/material.model'

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
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  providers: [DialogService]
})

export class MaterialComponent implements OnInit, AfterViewInit {

  materials: Observable<Material[]>;
  searchLoad:Subject<string> = new Subject<string>(); // subject used to monitor materials observable
  searchTotal:Subject<string> = new Subject<string>(); // subject used to monitor total count of materials

  hasCfList: {}[]= [{id: 1, name: 'Yes'}, {id: 0, name: 'No'}]; // used for dropdown CF
  hasCfDisp:{}={0:'No',1:'Yes'}; // temporary object used to display yes or no in the sceen as input from server comes in the form of 1 or 0
  searchOpt: {}= {brand: '', modal: '', job: ''}; // empty object used to pass the individual column searched for
  ed: {}= {}; // boolean for editing mode
  lastSearchObj: {}= {}; // used as a token to identify request is comming from normal get request or general search or individual search
  trig:string=""; // manual trigger the searchLoad and searchTotal
  pageCount= 4;
  perPageCount= 2;
  activePage=0;
  public result: any;

  newMaterial: Material= new Material;

  constructor(private restApiService: RestApiService, private dialogsService: DialogService) { }

  ngOnInit() {
    this.materials = this.searchLoad
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Material[]>([]);
      });

    this.searchTotal
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term)=> this.restApiService.getLength(term))
      .subscribe((value)=>{this.pageCount = value})

  }

  ngAfterViewInit(){
    // console.log("ngAfterViewInit")
    this.getMaterials(0);
    this.activePage=0
  }

  perPageCountChange(perPageCount) {
    // console.log("Entered page count change")
    // console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getMaterials(0);
    this.activePage=0
  }

  selectPage(p){
    // console.log("Entered select page")
    // console.log(p)
    // console.log(this.lastSearchObj['from'])
    this.trig=(this.trig==='sel')?this.trig+"1":'sel'
    this.activePage=p;
    switch (this.lastSearchObj['from']) {
      case "full":
        this.generalFilter(this.lastSearchObj['1'], p);
        break;

    case "ind":
        this.individualFilter(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

    case "start":
        this.getMaterials(p)
        break;

      default:
        // code...
        break;
    }
  }

  getMaterials(n) {
    // console.log("Entered get materials")
    // console.log(n)
    this.lastSearchObj = {'from':'start','1':n};

    let url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n)+"&"+this.trig;

    this.searchLoad.next(url);

    url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(1) + '&page=' + String(0)+"&"+this.trig;

    this.searchTotal.next(url);
  }

  postMaterial() {
    // console.log("Entered post material")
    const url = 'http://49.50.76.29/api/material/new';
    this.newMaterial['srno']="";
    // console.log(this.newMaterial);
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => res.json().data[0])
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          // console.log(this.newMaterial);
          this.newMaterial= new Material;
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  putMaterial(material) {
    // console.log("Entered put material")
    // console.log(material)
    const url = 'http://49.50.76.29/api/material/' + String(material.id);
    // console.log(material)
    this.restApiService.putRequest(url, material)
      .map(res => res.json().data)
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          // console.log(this.newMaterial)
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  deleteMaterial(material) {
    // console.log("Entered delete material")
    // console.log(material)
    const url = 'http://49.50.76.29/api/material/' + String(material.id);

    this.restApiService.deleteRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          // console.log(this.newMaterial)
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  generalFilter(event, n) {
    // console.log("Entered general filter")
    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }
    // console.log(val)
    // console.log(n)

    this.lastSearchObj = {'from':'full','1':val, '2':n};

    let url = 'http://49.50.76.29/api/material/search?search='+val+
                '&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.searchLoad.next(url)

    url = 'http://49.50.76.29/api/material/search?search='+val+
                '&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(1) + '&page=' + String(0);

    this.searchTotal.next(url)

  }

  individualFilter(sParam, k, n){
    // console.log("Entered individual filter")
    // console.log(sParam)
    // console.log(k)
    // console.log(n)

    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};

    let url = 'http://49.50.76.29/api/material/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);


    this.searchLoad.next(url)


    url = 'http://49.50.76.29/api/material/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(1) + '&page=' + String(0);

    this.searchTotal.next(url)

  }

}
