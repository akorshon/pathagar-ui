import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "./book";


@Injectable({
  providedIn: 'root'
})
export class AdminBookService {

  public static  URL = environment.backendUrl + "/api/admin/books";

  constructor(
    private http: HttpClient) {
  }

  backupSave(book: Book): Observable<any> {
    if(book.id) {
      return this.http.put(AdminBookService.URL, book);
    } else {
      return this.http.post(AdminBookService.URL, book);
    }
  }

  save(book: Book): Observable<any> {
    const formData: FormData = new FormData();
    if(book.file) {
      formData.append('file', book.file);
    }
    formData.append('name', book.name);
    formData.append('description', book.description);
    formData.append('authors', JSON.stringify(book.authors));
    formData.append('categories', JSON.stringify(book.categories));
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

  updateCategory(bookId: string, categoryId: string, action: string): Observable<any> {
    return this.http.post(`${AdminBookService.URL}/${bookId}/categories/${categoryId}/action/${action}`, {});
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
