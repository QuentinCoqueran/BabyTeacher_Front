import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {UpdateAvaibality} from "../models/UpdateAvaibality";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private urlAvailabilityParse = `${environment.apiUrl}/availability/getAvailabilityParseByUserId`;
  private urlAvailabilityById = `${environment.apiUrl}/availability/getByUser`;
  private urlUpdateAvailabilityBabysitter = `${environment.apiUrl}/availability/updateList`;
  private insertAvailabilityBabysitter = `${environment.apiUrl}/availability/create`;
  private urlDelete = `${environment.apiUrl}/availability/delete`;
  private urlComment = `${environment.apiUrl}/comment/create`;

  constructor(private http: HttpClient) {
  }

  getAvailabilityParseByUserId(idUser: string): Observable<any> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.get<any>(this.urlAvailabilityParse + "/" + idUser, header);
  }

  //getByUserId
  getByUserId(idUser: number): Observable<any> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.get<any>(this.urlAvailabilityById + "/" + idUser, header);
  }

  updateAvailabilityBabysitter(updateAvailability: UpdateAvaibality): Observable<boolean> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.put<boolean>(this.urlUpdateAvailabilityBabysitter, updateAvailability, header);
  }

  insertAvailability(avaibality: {}): Observable<boolean> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.post<boolean>(this.insertAvailabilityBabysitter, avaibality, header);
  }

  deleteAvaibality(id: number) {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.delete(this.urlDelete + "/" + id, header);
  }


  insertComment(comment: { idProfile: number; date: Date; note: number; content: string }) {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.post(this.urlComment, comment, header);
  }
}
