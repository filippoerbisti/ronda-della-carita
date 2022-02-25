import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface/iuser';
import axios from 'axios';

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
    return this.http.get('http://localhost:8000/api/user-profile');
  }




    async signIn ({ dispatch }: any, credentials: any) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', credentials)

      return dispatch('me')
    }

    // async signOut ({ dispatch }: any) {
    //   await axios.post('/logout')

    //   return dispatch('me')
    // }

    // me ({ commit }: any) {
    //   return axios.get('/api/user-profile').then((response: { data: any; }) => {
    //     commit('SET_AUTHENTICATED', true)
    //     commit('SET_USER', response.data)
    //   }).catch(() => {
    //     commit('SET_AUTHENTICATED', false)
    //     commit('SET_USER', null)
    //   })
    // }



}
