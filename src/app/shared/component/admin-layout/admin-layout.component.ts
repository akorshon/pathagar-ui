import {Component} from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-admin-layout',
  templateUrl: 'admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent{

  collapedSideBar!: boolean;
  receiveCollapsed(event: any) {
    this.collapedSideBar = event;
  }
}
