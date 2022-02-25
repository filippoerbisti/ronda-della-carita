import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseMansionDialogComponent } from '../dialog/mansion/choose-mansion-dialog/choose-mansion-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IUser } from '../shared/interface/iuser';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

  user!: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 5;

  isLoading = false;
  get: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
  }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  private getCookie(): Observable<any> {
    return this.get('/sanctum/csrf-cookie');
  }

  login() {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(response => {
      console.log(response); //This is one success but it did set cookie in application cookie
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          console.log('okkkkkkk');
        },
        error => {
          this.errors = error.error;
          this.snackBar.open("Email o password errate", 'OK', {
            horizontalPosition: this.horizontalPosition,
            duration: this.durationInSeconds * 1000
          })
        },() => {
          // this.authState.setAuthState(true);
          this.isSubmitted = true;
          this.loginForm.reset();
          const dialogRef = this.dialog.open(ChooseMansionDialogComponent);
        }
      );
    })
  }

  // // Handle response
  // responseHandler(data: { access_token: string }){
  //   // this.token.handleData(data.access_token, data.user);
  //   this.token.handleData(data.access_token);
  //   // this.user = data.user;
  //   // console.log(data.user);
  //   // alert(this.user.nome);
  // }
}
