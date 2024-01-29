import {NgModule} from '@angular/core';
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {UserLayoutComponent} from "./layout/user-layout/user-layout.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {HeaderComponent} from "./layout/partial/header/header.component";
import {SidebarComponent} from "./layout/partial/sidebar/sidebar.component";
import {RouterLinkActive, RouterLink, RouterOutlet} from "@angular/router";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FileSizePipe} from "./pipe/file-size-pipe";

@NgModule({
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLinkActive,
        RouterLink,
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
    FileSizePipe,
  ],
  providers: [
  ],
  exports: [
    FileSizePipe,
  ],
})
export class SharedModule { }
