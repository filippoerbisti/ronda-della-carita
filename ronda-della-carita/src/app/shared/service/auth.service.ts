import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface/iuser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

  // User registration
  register(user: IUser): Observable<any> {
    return this.http.post('http://localhost:8000/api/register', user);
  }

  // Login
  signin(user: IUser): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', user);
  }
  
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://localhost:8000/api/auth/user-profile');
  }
}