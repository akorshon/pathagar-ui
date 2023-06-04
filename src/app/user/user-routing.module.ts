import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BookComponent} from "./component/book/book.component";
import {UserBookComponent} from "./component/user-book/user-book.component";


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

