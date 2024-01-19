import {Component} from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {

  collapedSideBar!: boolean;
  receiveCollapsed(event: any) {
    this.collapedSideBar = event;
  }
}
