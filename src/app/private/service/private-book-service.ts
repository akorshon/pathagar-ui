import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";


@Injectable()
export class PrivateBookService {

  public static  URL = environment.backendUrl + "/api/public/books/";

  constructor(
    private http: HttpClient) {
  }

  save(book: Book, bookSrc: any, thumb: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', bookSrc);
    formData.append('name', book.name);
    formData.append('description', book.description);

    if(book.id) {
      formData.append('id', book.id);
      return this.http.put(PrivateBookService.URL, formData);
    } else {
      return this.http.post(PrivateBookService.URL, formData);
    }
  }

  findAll(): Observable<any> {
    return this.http.get(PrivateBookService.URL);
  }

  findById(id: string): Observable<any> {
    return this.http.get(PrivateBookService.URL + id);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(PrivateBookService.URL + id);
  }




}
