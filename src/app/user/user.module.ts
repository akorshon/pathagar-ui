import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookComponent} from "./component/book/book.component";
import {UserRoutingModule} from "./user-routing.module";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {AdminModule} from "../admin/admin.module";
import {UserBookComponent} from "./component/user-book/user-book.component";
import {BookViewComponent} from "./component/book-view/book-view.component";
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbPaginationModule,
    AdminModule,
    PdfViewerModule,
  ],
  declarations: [
    BookComponent,
    UserBookComponent,
    BookViewComponent,
  ],
  providers: [

  ]
})
export class UserModule {}
