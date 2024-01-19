import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../admin/book/book";


@Injectable({
  providedIn: 'root'
})
export class UserBookService {

  public static  URL = environment.backendUrl + "/api/user/books";

  constructor(
    private http: HttpClient) {
  }

  findAll(page: number, search=''): Observable<any> {
    page = page - 1;
    return this.http.get(`${UserBookService.URL}?page=${page}&size=20&search=${search}&sort=name`);
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${UserBookService.URL}/${id}`);
  }

}
