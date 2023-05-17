import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookComponent} from "./component/book/book.component";
import {PrivateRoutingModule} from "./private-routing.module";
import {PrivateBookService} from "./service/private-book-service";


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PrivateRoutingModule,
    ],
  declarations: [
    BookComponent
  ],
  providers: [
    PrivateBookService
  ]
})
export class PrivateModule {}
