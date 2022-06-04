import {Injectable} from '@angular/core';
import {UserConnect} from "../models/UserConnect";
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Token} from "../models/Token";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private urlConnection = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {
  }

  connectUser(userConnect: UserConnect): Observable<Token>  {
    return this.http.post<Token>(this.urlConnection, userConnect);
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("token") != null;
  }
}
