import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  // User registration
  register(user: IUser): Observable<any> {
    return this.http.post('https://backoffice-ronda.herokuapp.com/api/register', user);
  }

  // Login
  signin(user: IUser): Observable<any> {
    return this.http.post('https://backoffice-ronda.herokuapp.com/api/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('https://backoffice-ronda.herokuapp.com/api/auth/user-profile');
  }
}