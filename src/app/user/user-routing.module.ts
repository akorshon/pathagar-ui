import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BookComponent} from "./book/book/book.component";
import {UserBookComponent} from "./book/user-book/user-book.component";
import {AuthorsComponent} from "./author/authors/authors.component";
import {AuthorDetailsComponent} from "./author/author-details/author-details.component";
import {CategoriesComponent} from "./category/categories/categories.component";
import {CategoryComponent} from "../admin/category/category/category.component";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";


export const routes: Routes = [
  {
    path: '',
    component: BookComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'user-book',
    component: UserBookComponent,
  },
  {
    path: 'author',
    component: AuthorsComponent,
  },
  {
    path: 'author/:id',
    component: AuthorDetailsComponent,
  },
  {
    path: 'category',
    component: CategoriesComponent,
  },
  {
    path: 'category/:id',
    component: CategoryDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

