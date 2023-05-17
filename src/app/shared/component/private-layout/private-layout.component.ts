import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'private-layout.component.html',
  styleUrls: []
})
export class PrivateLayoutComponent implements OnDestroy, AfterViewInit {
  constructor(
    changeDetectorRef: ChangeDetectorRef) {
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
