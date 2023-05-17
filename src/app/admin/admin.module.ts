import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookUploadComponent} from "./component/book-upload/book-upload.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BooksComponent} from "./component/books/books.component";
import {BookComponent} from "./component/book/book.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    AdminRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    BooksComponent,
    BookComponent,
    BookUploadComponent
  ],
  providers: [
  ]
})
export class AdminModule {}
