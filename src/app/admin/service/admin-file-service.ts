import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Author} from "../author/author";
import {Category} from "../category/category";
import {Book} from "../book/book";


@Injectable({
  providedIn: 'root'
})
export class AdminFileService {

  static readonly  URL = environment.backendUrl + "/api/admin/file";
  constructor(
    private http: HttpClient) {
  }


  uploadBook(book: Book): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', book.file);
    formData.append('name', book.name);
    if(book.id) {
      formData.append('id', book.id);
      return this.http.put(`${AdminFileService.URL}/book`, formData);
    } else {
      return this.http.post(`${AdminFileService.URL}/book`, formData);
    }
  }

  uploadAuthor(author: Author): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', author.file);
    formData.append('name', author.name);
    formData.append('description', author.description);

    if(author.id) {
      formData.append('id', author.id);
      return this.http.put(`${AdminFileService.URL}/author`, formData);
    } else {
      return this.http.post(`${AdminFileService.URL}/author`, formData);
    }
  }

  uploadCategory(category: Category): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', category.file);
    formData.append('name', category.name);
    formData.append('description', category.description);
    if(category.id) {
      formData.append('id', category.id);
      return this.http.put(`${AdminFileService.URL}/category`, formData);
    } else {
      return this.http.post(`${AdminFileService.URL}/category`, formData);
    }
  }
}
