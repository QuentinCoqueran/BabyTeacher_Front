import {Injectable} from '@angular/core';
import {UserConnect} from "../models/UserConnect";
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from "../models/Token";
import {Observable} from "rxjs";
import {ResponseUser} from "../models/ResponseUser";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private urlConnection = `${environment.apiUrl}/auth/login`;
  private urlisUserLoggedIn = `${environment.apiUrl}/auth/me`;

  constructor(private http: HttpClient) {
  }

  connectUser(userConnect: UserConnect): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(this.urlConnection, userConnect);
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  async isUserLoggedIn(): Promise<boolean> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    try {
      return await this.getFirstConnection(header);
    } catch (e) {
      return false;
    }
  }

  async getFirstConnection(header: any) {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(this.urlisUserLoggedIn, header).subscribe(data => {
        resolve(true);
      }, error => {
        return reject(error)
      });
    });
  }

}
