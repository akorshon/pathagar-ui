import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Book} from "../../shared/model/book";
import {Author} from "../../shared/model/author";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthorService {

  public static  URL = environment.backendUrl + "/api/admin/authors";

  constructor(
    private http: HttpClient) {
  }

  save(author: Author, file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', author.name);

    if(author.id) {
      return this.http.put(AdminAuthorService.URL, formData);
    } else {
      return this.http.post(AdminAuthorService.URL, formData);
    }
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminAuthorService.URL}/id`);
  }

  findAll(): Observable<any> {
    return this.http.get(AdminAuthorService.URL);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminAuthorService.URL}/${id}`);
  }
}
