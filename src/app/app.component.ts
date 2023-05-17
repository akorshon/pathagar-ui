import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-loading-bar ref="http" height="4px" class="no-print"></ngx-loading-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
