import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookUploadComponent} from "./component/book-upload/book-upload.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BooksComponent} from "./component/books/books.component";
import {BookViewComponent} from "./component/book-view/book-view.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthorUploadComponent} from "./component/author-upload/author-upload.component";
import {AuthorsComponent} from "./component/authors/authors.component";
import {BookComponent} from "./component/book/book.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {AuthorComponent} from "./component/author/author.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    AdminRoutingModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [
    DashboardComponent,

    AuthorUploadComponent,
    AuthorComponent,
    AuthorsComponent,

    BookComponent,
    BooksComponent,
    BookViewComponent,
    BookUploadComponent
  ],
  providers: [
  ]
})
export class AdminModule {}
