import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private urlAvailabilityParse = `${environment.apiUrl}/availability/getAvailabilityParseByUserId`;

  constructor(private http: HttpClient) {
  }

  getAvailabilityParseByUserId(idUser: string): Observable<any> {
    return this.http.get<any>(this.urlAvailabilityParse + "/" + idUser);
  }

}
