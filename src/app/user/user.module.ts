import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookComponent} from "./component/book/book.component";
import {UserRoutingModule} from "./user-routing.module";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {UserBookComponent} from "./component/user-book/user-book.component";
import {BookViewComponent} from "./component/book-view/book-view.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthorsComponent} from "./component/authors/authors.component";
import {FileSizePipe} from "../shared/pipe/file-size-pipe";
import {AuthorDetailsComponent} from "./component/author-details/author-details.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbPaginationModule,
    PdfViewerModule,
    SharedModule,
  ],
  declarations: [
    BookComponent,
    UserBookComponent,
    BookViewComponent,

    AuthorsComponent,
    AuthorDetailsComponent,

  ],
  providers: [

  ]
})
export class UserModule {}
