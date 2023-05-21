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

  save(book: Book, bookSrc: any | null): Observable<any> {
    const formData: FormData = new FormData();
    if(bookSrc) {
      formData.append('file', bookSrc);
    }
    formData.append('name', book.name);
    formData.append('description', book.description);
    formData.append('authors', book.authors.map(author => author.id).join(','));
    if(book.id) {
      formData.append('id', book.id);
      return this.http.put(AdminBookService.URL, formData);
    } else {
      return this.http.post(AdminBookService.URL, formData);
    }
  }

  updateAuthor(bookId: string, authorId: string, action: string): Observable<any> {
    return this.http.post(`${AdminBookService.URL}/${bookId}/authors/${authorId}/action/${action}`, {});
  }

  findAll(page: number, search=''): Observable<any> {
    return this.http.get(`${AdminBookService.URL}?page=${page}&size=20&search=${search}`);
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminBookService.URL}/${id}`);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminBookService.URL}/${id}`);
  }




}
