import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {io} from "socket.io-client";
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


  constructor(private http: HttpClient) {
  }

  getAvailabilityParseByUserId(idUser: string): Observable<any> {
    return this.http.get<any>(this.urlAvailabilityParse + "/" + idUser);
  }

  //getByUserId
  getByUserId(idUser: number): Observable<any> {
    return this.http.get<any>(this.urlAvailabilityById + "/" + idUser);
  }

  updateAvailabilityBabysitter(updateAvailability: UpdateAvaibality): Observable<boolean> {
    return this.http.put<boolean>(this.urlUpdateAvailabilityBabysitter, updateAvailability);
  }

  insertAvailability(avaibality: {}): Observable<boolean> {
    return this.http.post<boolean>(this.insertAvailabilityBabysitter, avaibality);
  }
  deleteAvaibality(id: number) {
    return this.http.delete(this.urlDelete + "/" + id);
  }
}
