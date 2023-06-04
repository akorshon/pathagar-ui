import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {AuthInterceptor} from "./auth/interceptor /auth.interceptor";
import {FileSizePipe} from "./shared/pipe/file-size-pipe";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    LoadingBarHttpClientModule,
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
  ],

  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    FileSizePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
