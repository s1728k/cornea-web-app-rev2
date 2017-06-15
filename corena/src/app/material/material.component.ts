import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// ------models used-----------------
import {Material} from '../model/class/material.model'

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  hasCfList: {}[]= [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};
  lastSearchObj: {}= {};
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  newMaterial: Material= new Material;
  materials:Material[];


  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.getMaterials(0);
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void{
    const url = 'http://49.50.76.29/api/material/search?search='+ sTerm +'&' + fltr + '&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.pageCount);
  }

  selPage(p){
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

    const url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Material[]) => {
          this.materials = value;
          console.log(n);
          console.log(this.materials);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount('','filter[]=name&filter[]=srno&filter[]=brand');
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

    const url = 'http://49.50.76.29/api/material/search?search='+val+
                '&filter[]=name&filter[]=srno&filter[]=brand&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Material[]) => {
          this.materials = value;
          console.log(this.materials);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(val, 'filter[]=name&filter[]=srno&filter[]=brand');

  }

  individualFilter(sParam, k, n){
    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};
    const url = 'http://49.50.76.29/api/material/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Material[]) => {
          this.materials = value;
          console.log(this.materials);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(sParam[k], 'filter[]='+ k);
  }

}
