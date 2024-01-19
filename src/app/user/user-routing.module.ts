import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BookComponent} from "./component/book/book.component";
import {UserBookComponent} from "./component/user-book/user-book.component";
import {AuthorsComponent} from "./component/authors/authors.component";
import {AuthorDetailsComponent} from "./component/author-details/author-details.component";


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

