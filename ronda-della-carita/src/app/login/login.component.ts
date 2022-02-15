import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseMansionDialogComponent } from '../dialog/mansion/choose-mansion-dialog/choose-mansion-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { TokenService } from '../shared/service/token.service';
import { AuthStateService } from '../shared/service/auth-state.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IUser } from '../shared/interface/iuser';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcherEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class MyErrorStateMatcherPsw implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  loginForm!: FormGroup;

  errors: any = null;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcherEmail = new MyErrorStateMatcherEmail();
  matcherpsw = new MyErrorStateMatcherPsw();

  user!: IUser;

  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
    ) {
      this.loginForm = this.fb.group({
        email: [''],
        password: []
      })

      this.registerForm = this.fb.group({
        nome: [''],
        cognome: [''],
        email: [''],
        password: ['', [Validators.required]],
        password_confirmation: ['']
      })
    }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let password = group.controls['password'].value;
    let password_confirmation = group.controls['password_confirmation'].value;

    return password === password_confirmation ? null : { notSame: true };
  }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  login() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        const dialogRef = this.dialog.open(ChooseMansionDialogComponent);
      }
    );
  }

  // Handle response
  responseHandler(data: { access_token: string; }){
    this.token.handleData(data.access_token);
  }

  registration() {
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log(result)
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }
    )
  }

}
