import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})

export class IconsComponent implements OnInit{

    @Input() iconName:string;
    @Input() prefix:boolean=false;
    @Input() suffix:boolean=false;
    @Output() clicked = new EventEmitter();

    constructor(private iconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    }
    ngOnInit(){
      this.iconRegistry.addSvgIcon(
        this.iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/'+this.iconName+'.svg'));
    }

    clickedIcon(){
      this.clicked.emit()
    }

}