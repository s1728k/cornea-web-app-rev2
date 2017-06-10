import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materialList: {}[]= [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {id: 4, name: 'Jeep'}, {id: 5, name: 'BMTC Bus'}];
  brandList: {}[]= [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {id: 4, name: 'Jeep'}, {id: 5, name: 'BMTC Bus'}];
  uomList: {}[]= [{id: 1, name: '800'}, {id: 2, name: '600'}, {id: 3, name: '400'}, {id: 4, name: '200'}, {id: 5, name: '100'}];
  hasCfList: {}[]= [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];
  materialListDb: {}[]= [{'sr.no.': 1, 'brand': 'lflsfjs', 'modal': 'fsdfsfsdf', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'fddsf', 'modal': 'dddddd', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'rwerwr', 'modal': 'eeeeee', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'fsdrewr', 'modal': 'fsdfsfsdf', 'job': 'rrrr', 'price': 555555},
];
  rowsToDisplay: {}[]= [];
  newMaterial: {}= {};
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.rowsToDisplay = this.materialListDb;
    this.getMaterials();
  }

  getMaterials() {
    const url = 'http://49.50.76.29/api/material/all';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.materialListDb);
  }

  postMaterial(newMaterial) {
    const url = 'http://49.50.76.29/api/material/new';

    this.restApiService.postRequest(url, newMaterial)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.materialListDb.push(this.newMaterial);
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.materialListDb);
  }

  putMaterial(material) {
    const url = 'http://49.50.76.29/api/material/new';

    this.restApiService.putRequest(url, material)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(value);
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

  addNewBrand(){
    this.brandList.push({});
  }
  addNewModal(){
    this.uomList.push({});
  }


  addPriceList(newMaterial){
    // this.materialListDb.push(newMaterial);
    // this.rowsToDisplay=this.materialListDb
  }

  editRow(i){
    this.ed[i] = !this.ed[i];
    this.rowsToDisplay = this.materialListDb;
  }
  delRow(item){
    this.materialListDb.splice(this.materialListDb.indexOf(item), 1);
    this.updateFilter1(this.searchOpt);
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.materialListDb.filter(function(d) {
      return d['brand'].toLowerCase().indexOf(val) !== -1 || !val || d['modal'].toLowerCase().indexOf(val) !== -1
      || d['job'].toLowerCase().indexOf(val) !== -1 || d['job'].toLowerCase().indexOf(val) !== -1;
    });
    // update the rows
    this.rowsToDisplay = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  updateFilter1(sParam){
    //-------------2------------
    let val = sParam['brand'].toLowerCase();
    let temp = this.materialListDb.filter(function(d) {
      return d['brand'].toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.rowsToDisplay = temp;
    // -------------1------------
    val = sParam['sr'];
    temp = this.rowsToDisplay.filter(function(d) {
      return d['sr.no.'].toString().toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.rowsToDisplay = temp;
    //-------------3------------
    val = sParam['modal'].toLowerCase();
    temp = this.rowsToDisplay.filter(function(d) {
      return d['modal'].toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.rowsToDisplay = temp;
    //-------------4------------
    val = sParam['job'].toLowerCase();
    temp = this.rowsToDisplay.filter(function(d) {
      return d['job'].toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.rowsToDisplay = temp;
    //-------------5------------
    val = sParam['price'];
    temp = this.rowsToDisplay.filter(function(d) {
      return d['price'].toString().toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.rowsToDisplay = temp;
  }

}
