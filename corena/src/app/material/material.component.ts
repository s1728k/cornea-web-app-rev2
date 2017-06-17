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

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, AfterViewInit {

  materials: Observable<Material[]>;
  searchLoad:Subject<string> = new Subject<string>();
  searchTotal:Subject<string> = new Subject<string>();
  quickLoad:Subject<string> = new Subject<string>();
  quickTotal:Subject<string> = new Subject<string>();
  loadTime:number=300;

  hasCfList: {}[]= [{id: 1, name: 'Yes'}, {id: 0, name: 'No'}];
  hasCfDisp:{}={0:'No',1:'Yes'};
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};
  lastSearchObj: {}= {};
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  newMaterial: Material= new Material;
  //materials:Material[];

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.materials = this.searchLoad
      .debounceTime(this.loadTime)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Material[]>([]);
      });

    this.searchTotal
      .debounceTime(this.loadTime)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term)=> this.restApiService.getLength(term))
      .subscribe((value)=>{this.pageCount = value})

    // this.materials = this.quickLoad
    //   .switchMap(term => this.restApiService.search(term))
    //   .catch(error => {
    //     // TODO: add real error handling
    //     console.log(error);
    //     return Observable.of<Material[]>([]);
    //   });

    // this.quickTotal
    //   .switchMap((term)=> this.restApiService.getLength(term))
    //   .subscribe((value)=>{this.pageCount = value})

  }

  ngAfterViewInit(){
    this.getMaterials(0);
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void{

    // const url = 'http://49.50.76.29/api/material/search?search='+ sTerm +'&' + fltr + '&perPage=1&page=0';
    // this.restApiService.url2 = url
    // this.searchTerms2.next(sTerm);

    // this.restApiService.getRequest(url)
    //   .map(res => /*this.loggeddInUser = <User>*/res.json().total)
    //   .subscribe(
    //     (value: any) => {
    //       this.pageCount = value;
    //       console.log(this.pageCount);
    //     },
    //     (err: any) => {
    //       console.error(err);
    //     }
    //   );
    // console.log(this.pageCount);
  }

  selPage(p){
    console.log(this.lastSearchObj['from'])
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

  check(perPageCount) {
    console.log(this.perPageCount);
  }

  getMaterials(n) {
    this.lastSearchObj = {'from':'start','1':n};
    this.loadTime=0;

    let url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);


                console.log(n);
    this.searchLoad.next(url);


    url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&filter[]=uom&perPage=' +
                String(1) + '&page=' + String(0);


    this.searchTotal.next(url);

  }

  postMaterial() {
    const url = 'http://49.50.76.29/api/material/new';
    console.log(this.newMaterial);
    this.newMaterial['srno']="";
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data[0])
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.newMaterial= new Material;
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  putMaterial(material) {
    const url = 'http://49.50.76.29/api/material/' + String(material.id);

    this.restApiService.putRequest(url, material)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
          // this.materialListDb.push(this.newMaterial);
          // this.rowsToDisplay = this.materialListDb;
          // console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    // console.log(this.materialListDb);
  }

  deleteMaterial(material) {
    const url = 'http://49.50.76.29/api/material/' + String(material.id);

    this.restApiService.deleteRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Material) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
          // this.materialListDb.push(this.newMaterial);
          // this.rowsToDisplay = this.materialListDb;
          // console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    // console.log(this.materialListDb);
  }

  generalFilter(event, n) {
    console.log(n)
    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }

    this.lastSearchObj = {'from':'full','1':val, '2':n};
    this.loadTime=300;

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
    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};
    this.loadTime=300;

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
