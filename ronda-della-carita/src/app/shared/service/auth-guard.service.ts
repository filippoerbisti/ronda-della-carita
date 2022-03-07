import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import axios from 'axios';
import { IUser } from '../interface/iuser';

@Injectable()
export class AuthGuardService implements CanActivate {

  user!: IUser;

  constructor(
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      let response_user = await axios.get("http://localhost:8000/api/user-profile");
      this.user = response_user.data;
      console.log(response_user.data);
    }
    catch (err) {
      console.log(err);
    }

    const isAdmin = 'admin';

    if (this.user.ruolo == isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
