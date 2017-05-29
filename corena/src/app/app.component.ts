import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links: any[] = ['Dashboard', 'Purchase Order', 'Site', 'Accounts', 'Finance'];
  up: boolean[] = [false, false, false, false, false, false, false];
}
