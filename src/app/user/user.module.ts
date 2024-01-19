import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookComponent} from "./book/book/book.component";
import {UserRoutingModule} from "./user-routing.module";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {UserBookComponent} from "./book/user-book/user-book.component";
import {BookViewComponent} from "./book/book-view/book-view.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AuthorsComponent} from "./author/authors/authors.component";
import {FileSizePipe} from "../shared/pipe/file-size-pipe";
import {AuthorDetailsComponent} from "./author/author-details/author-details.component";
import {SharedModule} from "../shared/shared.module";
import {CategoriesComponent} from "./category/categories/categories.component";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";


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

    CategoriesComponent,
    CategoryDetailsComponent,
  ],
  providers: [

  ]
})
export class UserModule {}
