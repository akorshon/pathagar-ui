import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BooksComponent} from "./book/books/books.component";
import {AuthorsComponent} from "./author/authors/authors.component";
import {CategoriesComponent} from "./category/categories/categories.component";
import {AuthorComponent} from "./author/author/author.component";


export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'authors/:id',
    component: AuthorComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'book',
    component: BooksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

