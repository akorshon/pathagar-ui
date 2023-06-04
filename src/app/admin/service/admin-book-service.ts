import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";


@Injectable({
  providedIn: 'root'
})
export class AdminBookService {

  public static  URL = environment.backendUrl + "/api/admin/books";

  constructor(
    private http: HttpClient) {
  }

  save(book: Book): Observable<any> {
    if(book.id) {
      return this.http.put(AdminBookService.URL, book);
    } else {
      return this.http.post(AdminBookService.URL, book);
    }
  }

  updateAuthor(bookId: string, authorId: string, action: string): Observable<any> {
    return this.http.post(`${AdminBookService.URL}/${bookId}/authors/${authorId}/action/${action}`, {});
  }

  findAll(page: number, search=''): Observable<any> {
    page = page - 1;
    return this.http.get(`${AdminBookService.URL}?page=${page}&size=20&search=${search}&sort=name`);
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminBookService.URL}/${id}`);
  }


  updateThumb(bookId: string, page: number): Observable<any> {
    return this.http.post(`${AdminBookService.URL}/${bookId}/thumb/${page}`, {});
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminBookService.URL}/${id}`);
  }




}
