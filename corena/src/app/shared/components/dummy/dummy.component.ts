import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dummy',
  template: '<div></div>',
})

export class DummyComponent implements OnInit, OnChanges{

    @Input() arr1:any[];
    @Output() arr1Change = new EventEmitter();

    @Input() arr2:any[];
    @Output() arr2Change = new EventEmitter();

    @Input() arr3:any[];
    @Output() arr3Change = new EventEmitter();

    emitValues(){
      this.arr1Change.emit(this.arr1)
      this.arr2Change.emit(this.arr2)
      this.arr3Change.emit(this.arr3)
    }

    constructor() {}
    ngOnInit(){

    }

    loadRes:boolean=false
    ngOnChanges(){
      if(!this.loadRes){
        if(this.arr1 && this.arr2 && this.arr3){
          this.loadRes=!this.loadRes
          this.emitValues()
        }
      }
    }

}