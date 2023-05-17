import {AfterViewInit, Component, OnDestroy} from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'public-layout.component.html',
  styleUrls: []
})
export class PublicLayoutComponent implements OnDestroy, AfterViewInit {

  constructor() {
    //this.mobileQuery = media.matchMedia('(min-width: 768px)');
    //this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    //this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  ngAfterViewInit() {
    console.log('full layout init');
  }
}
