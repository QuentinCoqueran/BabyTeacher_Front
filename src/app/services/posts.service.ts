import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {UpdateAvaibality} from "../models/UpdateAvaibality";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private urlCreatePost = `${environment.apiUrl}/post/add`;


  constructor(private http: HttpClient) {
  }


  createPosts(postsSave: { codeDep: string[]; cityCode: number |null; hourlyWage: number; description: string; numberChild: number |null; availability: string[][] | null, ageChild: null }) {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.post<boolean>(this.urlCreatePost, postsSave, header);
  }
}
