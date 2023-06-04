import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";
import {UserBook} from "../../shared/model/user-book";


@Injectable({
  providedIn: 'root'
})
export class AdminUserBookService {

  public static  BOOK_URL = environment.backendUrl + "/api/admin/books";
  public static  URL = environment.backendUrl + "/api/admin/user-books";

  constructor(
    private http: HttpClient) {
  }

  save(userBook: UserBook): Observable<any> {
    if(userBook.id) {
      return this.http.put(AdminUserBookService.URL, userBook);
    } else {
      return this.http.post(AdminUserBookService.URL, userBook);
    }
  }

  findAll(page: number, search=''): Observable<any> {
    page = page - 1;
    return this.http.get(`${AdminUserBookService.URL}?page=${page}&size=50&search=${search}`);
  }

  findByBookId(bookId: string): Observable<any> {
    return this.http.get(`${AdminUserBookService.URL}/book/${bookId}`);
  }

  updateThumb(bookId: string, page: number): Observable<any> {
    return this.http.post(`${AdminUserBookService.BOOK_URL}/${bookId}/thumb/${page}`, {});
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminUserBookService.URL}/${id}`);
  }

}
