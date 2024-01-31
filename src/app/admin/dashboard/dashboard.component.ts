import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: []
})
export class DashboardComponent implements OnInit {
  time = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }


}
