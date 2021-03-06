import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/interface/IUser';
import { IHistory } from 'src/app/shared/interface/IHistory';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcherEmail implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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

  loginForm!: UntypedFormGroup;

  errors: any = null;

  isSubmitted: boolean = false;

  hide = true;

  emailQueryParams = true;
  pswQueryParams = true;

  matcherEmail = new MyErrorStateMatcherEmail();

  user!: IUser;
  history!: IHistory;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 5;

  isLoading = false;

  private API_URL = environment.API_URL;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      n_tessera: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    console.log("API URL", this.API_URL);
    
  }

  ngAfterViewInit() {
    if (this.route.snapshot.queryParams['email'] && this.route.snapshot.queryParams['password']) {
      this.route.queryParams
        .subscribe((params) => {
          this.pswQueryParams = false;
          this.emailQueryParams = false;
          this.loginForm.value.email = params['email'];
          this.loginForm.value.password = params['password'];
        }
        );
    }
  }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  login() {
    localStorage.removeItem("user");
    const url = `${this.API_URL}/sanctum/csrf-cookie`;
    axios.get(url).then(response => {
      // console.log(response); //This is one success but it did set cookie in application cookie
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.user = result.user;
          localStorage.setItem('user', JSON.stringify(result.user));
          this.history = result.user.id;
          console.log(this.history);
          // axios.post(this.API_URL + '/api/history/create', this.history);
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
        }, () => {
          this.isSubmitted = true;
          this.loginForm.reset();
        }
      );
    })
  }
}
