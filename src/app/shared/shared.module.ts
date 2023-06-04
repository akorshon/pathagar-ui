import {NgModule} from '@angular/core';
import {AdminLayoutComponent} from "./component/admin-layout/admin-layout.component";
import {UserLayoutComponent} from "./component/user-layout/user-layout.component";
import {AuthLayoutComponent} from "./component/auth-layout/auth-layout.component";
import {HeaderComponent} from "./component/partial/header/header.component";
import {SidebarComponent} from "./component/partial/sidebar/sidebar.component";
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLinkActive,
        RouterLinkWithHref,
        NgbCollapseModule,
        FontAwesomeModule,
        NgbDropdownModule
    ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class SharedModule { }
