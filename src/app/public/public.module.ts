import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BooksComponent} from "./component/books/books.component";
import {BookComponent} from "./component/book/book.component";
import {AdminBookService} from "../admin/service/admin-book-service";
import {PublicRoutingModule} from "./public-routing.module";


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      PublicRoutingModule,
      ReactiveFormsModule,
    ],
  declarations: [
    BookComponent,
    BooksComponent,
  ],
  providers: [
    AdminBookService
  ]
})
export class PublicModule {
}
