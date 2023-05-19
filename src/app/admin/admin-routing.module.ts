import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BooksComponent} from "./component/books/books.component";
import {AuthorsComponent} from "./component/authors/authors.component";


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'book',
    component: BooksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

