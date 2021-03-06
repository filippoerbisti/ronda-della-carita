import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { IUser } from 'src/app/shared/interface/IUser';

@Injectable()
export class AuthGuardService implements CanActivate {

  user!: IUser;

  constructor(
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.user = JSON.parse(localStorage["user"]);
    
    const isAdmin = 'admin';

    if (this.user.ruolo == isAdmin) {
      this.router.navigate(['admin/home']);
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
