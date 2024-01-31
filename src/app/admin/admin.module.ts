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
import {SharedModule} from "../shared/shared.module";
import {CategoryUploadComponent} from "./category/category-upload/category-upload.component";
import {CategoriesComponent} from "./category/categories/categories.component";
import {CategoryComponent} from "./category/category/category.component";


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
    SharedModule,
  ],
  declarations: [
    DashboardComponent,

    AuthorUploadComponent,
    AuthorComponent,
    AuthorsComponent,

    CategoryUploadComponent,
    CategoriesComponent,
    CategoryComponent,

    BookComponent,
    BooksComponent,
    BookUploadComponent,
  ],
  exports: [

  ],
  providers: []
})
export class AdminModule {}
