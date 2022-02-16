import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interface/iuser';

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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcherEmail = new MyErrorStateMatcherEmail();

  user!: IUser;

  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: [''],
      password: ['', [Validators.required]],
      password_confirmation: ['']
    })
  }

  ngOnInit(): void {
  }

  // checkPasswords(group: FormGroup) {
  //   // here we have the 'passwords' group
  //   let password = group.controls['password'].value;
  //   let password_confirmation = group.controls['password_confirmation'].value;

  //   return password === password_confirmation ? null : { notSame: true };
  // }

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
