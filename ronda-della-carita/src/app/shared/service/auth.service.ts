import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/interface/IUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  // User registration
  register(user: IUser): Observable<any> {
    return this.http.post(this.API_URL + '/api/register', user);
  }

  // Login
  signin(user: IUser): Observable<any> {
    return this.http.post(this.API_URL + '/api/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.API_URL + '/api/auth/user-profile');
  }
}