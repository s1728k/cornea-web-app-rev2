import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links: any[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
  up: boolean[] = [false, false, false, false, false, false, false];
}
