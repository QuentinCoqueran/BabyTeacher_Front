import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private urlSaveMessage = `${environment.apiUrl}/message/save-message`;
  private urlGetMessage = `${environment.apiUrl}/message/get-message`;
  private urlIsMessageExist = `${environment.apiUrl}/message/is-message-exist`;
  private urlCreateSessionMessage = `${environment.apiUrl}/message/create-session-message`;
  private urlGetAllMessagesByIdUser = `${environment.apiUrl}/message/get-all-messages-by-id`;
  public message$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  socket = io(environment.apiUrl);

  public sendMessage(message: string, idUser: number, userId: string) {
    this.socket.emit('data', {message: message, idUser: idUser, userId: userId});
  }

  public joinRoom(idSession : string) {
    this.socket.emit('createRoom', {idSession: idSession});
  }

  public getNewMessage = () => {
    this.socket.on('eventToClient', (data) => {
      this.message$.next(data);
    });
    return this.message$.asObservable();
  };

  createSessionMessage(message: any): Observable<any> {
    return this.http.post<boolean>(this.urlCreateSessionMessage, message);
  }

  saveMessage(message: any): Observable<boolean> {
    return this.http.post<boolean>(this.urlSaveMessage, message);
  }

  getMessage(idUser1: number, idUser2: number): Observable<any> {
    return this.http.get<any>(this.urlGetMessage + "/" + idUser1 + "/" + idUser2);
  }

  getAllMessagesByIdUser(idUser: string): Observable<any> {
    return this.http.get<any>(this.urlGetAllMessagesByIdUser + "/" + idUser);
  }

  isMessageExist(idUser1: number, idUser2: number): Observable<any> {
    return this.http.get<boolean>(this.urlIsMessageExist + "/" + idUser1 + "/" + idUser2);
  }

}
