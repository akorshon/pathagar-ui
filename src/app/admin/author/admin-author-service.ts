import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Author} from "./author";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthorService {

  static readonly  URL = environment.backendUrl + "/api/admin/authors";

  constructor(
    private http: HttpClient) {
  }

  uploadAuthor(author: Author): Observable<any> {
    const formData: FormData = new FormData();
    if(author.file) {
      formData.append('file', author.file);
    }
    formData.append('name', author.name);
    formData.append('description', author.description);

    if(author.id) {
      formData.append('id', author.id);
      return this.http.put(AdminAuthorService.URL, formData);
    } else {
      return this.http.post(AdminAuthorService.URL, formData);
    }
  }

  save(author: Author): Observable<any> {
    if(author.id) {
      return this.http.put(AdminAuthorService.URL, author);
    } else {
      return this.http.post(AdminAuthorService.URL, author);
    }
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${AdminAuthorService.URL}/${id}`);
  }

  findAll(page: number, search: string): Observable<any> {
    page = page - 1;
    return this.http.get(`${AdminAuthorService.URL}?page=${page}&size=20&search=${search}`);
  }

  delete(id=''): Observable<any> {
    return this.http.delete(`${AdminAuthorService.URL}/${id}`);
  }
}
