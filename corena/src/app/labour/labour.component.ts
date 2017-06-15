import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// ----Models Used-------------
import {Labour} from '../model/class/labour.model'

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css']
})
export class LabourComponent implements OnInit {

  uomList: {}[]= ['hourly', 'daily', 'monthly'];
  typeList: any[]= ['Internal', 'Contract'];
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};
  lastSearchObj: {}= {};
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  newLabour: Labour= new Labour();
  labours: Labour[];

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.getLabours(0);
  }

  perPageCountChange(perPageCount) {
    this.perPageCount=perPageCount;
    this.getLabours(0);
  }

  getPageCount(sTerm: string, fltr: string): void{
    const url = 'http://49.50.76.29/api/labour/search?search='+ sTerm +'&' + fltr + '&perPage=10&page=0';

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
        this.getLabours(p)
        break;

      default:
        // code...
        break;
    }
  }

  getLabours(n) {
    this.lastSearchObj = {'from':'start','1':n};

    const url = 'http://49.50.76.29/api/labour/search?search=&filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Labour[]) => {
          this.labours = value;
          console.log(n);
          console.log(this.labours);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount('','filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom');
  }

  postLabour() {
    const url = 'http://49.50.76.29/api/labour/new';
    this.newLabour['srno']=""
    this.restApiService.postRequest(url, this.newLabour)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data[0])
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          console.log(this.newLabour);
          this.newLabour= new Labour();
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  putLabour(material) {
    const url = 'http://49.50.76.29/api/labour/' + String(material.id);

    this.restApiService.putRequest(url, material)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          console.log(value);
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
        }
      );
    // console.log(this.materialListDb);

  }

  deleteLabour(material) {
    const url = 'http://49.50.76.29/api/labour/' + String(material.id);

    this.restApiService.deleteRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          console.log(value);
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  generalFilter(event, n) {

    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }
    this.lastSearchObj = {'from':'full','1':val, '2':n};

    const url = 'http://49.50.76.29/api/labour/search?search='+val+
                '&filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Labour[]) => {
          this.labours = value;
          console.log(this.labours);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(val, 'filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom');

  }

  individualFilter(sParam, k, n){
    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};
    const url = 'http://49.50.76.29/api/labour/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: Labour[]) => {
          this.labours = value;
          console.log(this.labours);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(sParam[k], 'filter[]='+ k);
  }

}
