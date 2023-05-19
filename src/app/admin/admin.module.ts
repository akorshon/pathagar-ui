import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookUploadComponent} from "./component/book-upload/book-upload.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BooksComponent} from "./component/books/books.component";
import {BookComponent} from "./component/book/book.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthorComponent} from "./component/author/author.component";
import {AuthorsComponent} from "./component/authors/authors.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        AdminRoutingModule,
        NgbModule,
    ],
  declarations: [
    DashboardComponent,

    AuthorComponent,
    AuthorsComponent,

    BooksComponent,
    BookComponent,
    BookUploadComponent
  ],
  providers: [
  ]
})
export class AdminModule {}
