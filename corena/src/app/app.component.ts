import {Component, OnInit} from '@angular/core';
import {SpinnerloaderService} from './services/spinner/spinnerloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  showLoader: boolean;

  constructor(
    private spinnerloaderService: SpinnerloaderService) {
  }

  ngOnInit() {
    this.spinnerloaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }


}
