import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";
import {UserBook} from "../../shared/model/user-book";


@Injectable({
  providedIn: 'root'
})
export class UserBookService {

  public static  USER_BOOK_URL = environment.backendUrl + "/api/user/user-books";

  constructor(
    private http: HttpClient) {
  }

  save(userBook: UserBook): Observable<any> {
    if(userBook.id) {
      return this.http.put(UserBookService.USER_BOOK_URL, userBook);
    } else {
      return this.http.post(UserBookService.USER_BOOK_URL, userBook);
    }
  }

  findAll(page: number, search=''): Observable<any> {
    page = page - 1;
    return this.http.get(`${UserBookService.USER_BOOK_URL}?page=${page}&size=50&search=${search}`);
  }

  findByBookId(bookId: string): Observable<any> {
    return this.http.get(`${UserBookService.USER_BOOK_URL}/book/${bookId}`);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${UserBookService.USER_BOOK_URL}/${id}`);
  }

}
