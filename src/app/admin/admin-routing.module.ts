import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BookUploadComponent} from "./component/book-upload/book-upload.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BooksComponent} from "./component/books/books.component";


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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

