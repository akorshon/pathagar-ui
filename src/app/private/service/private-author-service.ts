import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";
import {Author} from "../../shared/model/author";


@Injectable()
export class PrivateAuthorService {

  public static  URL = environment.backendUrl + "/api/admin/authors/";

  constructor(
    private http: HttpClient) {
  }

  save(author: Author): Observable<any> {
    if(author.id) {
      return this.http.put(PrivateAuthorService.URL, author);
    } else {
      return this.http.post(PrivateAuthorService.URL, author);
    }
  }

  findById(id: string): Observable<any> {
    return this.http.get(PrivateAuthorService.URL + id);
  }

  findAll(): Observable<any> {
    return this.http.get(PrivateAuthorService.URL);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(PrivateAuthorService.URL + id);
  }
}
