import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class SettingService {

  public static  CLEANUP_URL = environment.backendUrl + "/api/admin/setting/clean-up";
  public static  THUMB_URL = environment.backendUrl + "/api/admin/thumbs";
  public static  MOVE_FILE_URL = environment.backendUrl + "/api/admin/file/move";

  public static  VISIT_URL = environment.backendUrl + "/api/admin/setting/visit";
  public static  FIX_DATE_URL = environment.backendUrl + "/api/admin/setting/fix-date-by-name";
  public static  GEN_HASH_URL = environment.backendUrl + "/api/admin/setting/generate-hash";

  constructor(private http: HttpClient) { }

  visitFiles(): Observable<any> {
    return this.http.get(SettingService.VISIT_URL);
  }

  createThumb(): Observable<any> {
    return this.http.get(SettingService.THUMB_URL);
  }

  cleanUpFiles(): Observable<any> {
    return this.http.get(SettingService.CLEANUP_URL);
  }

  moveFiles(): Observable<any> {
    return this.http.get(SettingService.MOVE_FILE_URL);
  }

  fixDate() {
    return this.http.get(SettingService.FIX_DATE_URL);
  }

  genHash() {
    return this.http.post(SettingService.GEN_HASH_URL, {});
  }
}
