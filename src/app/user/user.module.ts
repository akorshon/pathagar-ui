import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookComponent} from "./component/book/book.component";
import {UserRoutingModule} from "./user-routing.module";
import {UserBookService} from "./service/user-book-service";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FileSizePipe} from "../shared/pipe/file-size-pipe";
import {AdminModule} from "../admin/admin.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbPaginationModule,
    AdminModule,
  ],
  declarations: [
    BookComponent
  ],
  providers: [

  ]
})
export class UserModule {}
