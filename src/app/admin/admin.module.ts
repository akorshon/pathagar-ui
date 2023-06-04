import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookUploadComponent} from "./book/book-upload/book-upload.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BooksComponent} from "./book/books/books.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthorUploadComponent} from "./author/author-upload/author-upload.component";
import {AuthorsComponent} from "./author/authors/authors.component";
import {BookComponent} from "./book/book/book.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {AuthorComponent} from "./author/author/author.component";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {SettingComponent} from "./setting/setting.component";
import {FileSizePipe} from "../shared/pipe/file-size-pipe";
import {AuthorDetailsComponent} from "./author/author-details/author-details.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    AdminRoutingModule,
    NgbModule,
    NgSelectModule,
    NgxExtendedPdfViewerModule,
  ],
  declarations: [
    DashboardComponent,

    AuthorUploadComponent,
    AuthorComponent,
    AuthorsComponent,
    AuthorDetailsComponent,

    BookComponent,
    BooksComponent,
    BookUploadComponent,


    SettingComponent,
    FileSizePipe,
  ],
  exports: [
    FileSizePipe
  ],
  providers: []
})
export class AdminModule {}
