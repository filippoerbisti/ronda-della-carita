import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interface/iuser';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  errors: any = null;

  hide = true;

  matcherEmail = new MyErrorStateMatcherEmail();
  matcherPsw = new MyErrorStateMatcherPsw();

  user!: IUser;

  isLoading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 10;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.checkPasswords]],
      password_confirmation: ['', [this.checkPasswords]],
      admin_confirm: false
    })
  }

  ngOnInit(): void {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let password_confirmation = group.get('password_confirmation')?.value;

    return password === password_confirmation ? null : { notSame: true };
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
        this.snackBar.open("Registrazione avvenuta on successo! `</br>` In attesa dell'amministratore, la contatteremo via mail quando tutto sarà pronto.", 'OK', {
          horizontalPosition: this.horizontalPosition,
          duration: this.durationInSeconds * 1000
        })
      }
    )
  }

}
