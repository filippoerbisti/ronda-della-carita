import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/interface/iuser';
import { ActivatedRoute } from '@angular/router';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcherEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  errors: any = null;

  isSubmitted: boolean = false;

  hide = true;

  matcherEmail = new MyErrorStateMatcherEmail();

  user!: IUser;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 5;

  isLoading = false;

  // email:any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      })
    }

  ngOnInit() {
    // this.route.queryParams
    //   .subscribe((params) => {
    //     console.log(params);
    //     let x: any;

    //     x = params['email'];

    //     console.log(this.email);
    //   }
    // );
  }

  // ngAfterViewInit() {
  //   this.route.queryParams
  //     .subscribe((params) => {
  //       console.log(params);
  //       if (params['email'] == '') {
  //         console.log();
  //       } else if (params['email'] != '') {
  //         this.loginForm.value.email = params['email'];
  //       }
  //       console.log(this.loginForm.value.email);
  //     }
  //   );
  // }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  login() {
    localStorage.removeItem("user");
    const url = `https://backoffice-ronda.herokuapp.com/sanctum/csrf-cookie`;
    axios.get(url).then(response => {
      // console.log(response); //This is one success but it did set cookie in application cookie
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          // this.user = result.user;
          // console.log(result.user);
          this.user = result.user;
          localStorage.setItem('user', JSON.stringify(result.user));
          if (this.user.ruolo == 'Interno') {
            this.router.navigate(['vol1/home']);
          } 
          if (this.user.ruolo == 'Esterno') {
            this.router.navigate(['vol0/home']);
          } 
          if (this.user.ruolo == 'Admin') {
            this.router.navigate(['admin/home']);
          } 
        },
        error => {
          this.errors = error.error;
          this.snackBar.open("Email o password errate", 'OK', {
            horizontalPosition: this.horizontalPosition,
            duration: this.durationInSeconds * 1000
          })
        },() => {
          this.isSubmitted = true;        
          this.loginForm.reset();
        }
      );
    })
  }

}
