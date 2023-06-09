import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FileType} from "../../shared/model/file-type";


@Injectable({
  providedIn: 'root'
})
export class AdminFileService {

  public static  URL = environment.backendUrl + "/api/admin/file";
  constructor(
    private http: HttpClient) {
  }

  uploadBook(file: File, fileType: FileType): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    return this.http.post(`${AdminFileService.URL}/book`, formData);
  }

  uploadAuthor(file: File, fileType: FileType): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    return this.http.post(`${AdminFileService.URL}/author`, formData);
  }
}
