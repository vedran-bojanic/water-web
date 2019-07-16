import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  authenticate(username, password) {
    return this.http.post<UserModel>('/token/generate', { username, password })
      .pipe(
        tap(
          userData => {
            localStorage.setItem('username', username );
            const authString = 'Bearer ' + userData.result.token;
            localStorage.setItem('basicauth', authString);
            localStorage.setItem('userId', userData.result.userId);
          })
      );
  }

  isUserLoggedIn() {
    const user = localStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('basicauth');
  }
}
