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

  save(book: Book, bookSrc: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', bookSrc);
    formData.append('name', book.name);
    formData.append('description', book.description);

    if(book.id) {
      formData.append('id', book.id);
      return this.http.put(AdminBookService.URL, formData);
    } else {
      return this.http.post(AdminBookService.URL, formData);
    }
  }

  findAll(page: number): Observable<any> {
    page = page - 1;
    return this.http.get(`${AdminBookService.URL}?page=${page}&size=20`);
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminBookService.URL}/${id}`);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminBookService.URL}/${id}`);
  }




}
