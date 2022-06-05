import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {UserConnect} from 'src/app/models/UserConnect';
import {ResponseBool} from "../models/ResponseBool";
import {UserSubscribe} from "../models/UserSubscribe";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private urlSubscribe = `${environment.apiUrl}/auth/subscribe`;

  constructor(private http: HttpClient) {
  }

  subscribeUser(user: UserSubscribe): Observable<ResponseBool> {
    return this.http.post<ResponseBool>(this.urlSubscribe, user);
  }

}

