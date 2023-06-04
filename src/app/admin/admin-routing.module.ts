import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BooksComponent} from "./book/books/books.component";
import {AuthorsComponent} from "./author/authors/authors.component";
import {SettingComponent} from "./setting/setting.component";
import {AuthorDetailsComponent} from "./author/author-details/author-details.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
    component: AuthorDetailsComponent,
  },
  {
    path: 'book',
    component: BooksComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

