import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  static readonly  URL = environment.backendUrl + "/api/user/categories";

  constructor(
    private http: HttpClient) {
  }


  findById(id: string): Observable<any> {
    return this.http.get(`${UserCategoryService.URL}/${id}`);
  }

  findAll(page: number, search: string): Observable<any> {
    page = page - 1;
    return this.http.get(`${UserCategoryService.URL}?page=${page}&size=20&search=${search}`);
  }
}
