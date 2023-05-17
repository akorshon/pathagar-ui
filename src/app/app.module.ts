import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    LoadingBarHttpClientModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
