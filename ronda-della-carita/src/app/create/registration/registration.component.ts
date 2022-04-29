import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/interface/IUser';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcherEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class MyErrorStateMatcherPsw implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
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

  public roles = [
    { value: "Esterno" },
    { value: "Interno" },
    { value: "Admin" }
  ]

  errors: any = null;

  isSubmitted: boolean = false;

  hide = false;

  matcherEmail = new MyErrorStateMatcherEmail();
  matcherPsw = new MyErrorStateMatcherPsw();

  user!: IUser;

  psw!: any;

  rule!: string;

  isLoading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 10;

  private API_URL = environment.API_URL;

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
      ruolo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['Ronda1234.', [Validators.required]],
      password_confirmation: ['Ronda1234.', [Validators.required]]
    },
      { validators: this.checkPasswords }
    )
  }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls['password']?.value;
    let password_confirmation = group.controls['password_confirmation'].value;

    return password === password_confirmation ? null : { notSame: true };
  }

  // makePassword(){
  //   console.log('make password');

  //   if (this.registerForm.value.nome != '' && this.registerForm.value.cognome != '') {
  //     console.log('making');
  //     this.psw = "#" +this.registerForm.value.nome + '.' + this.registerForm.value.cognome
  //     console.log(this.psw);      
  //     this.registerForm.value.password = this.psw
  //     this.registerForm.value.password_confirmation = this.psw
  //     console.log(this.registerForm.value);
  //   }

  // }

  async registration() {
    let idUser: number;
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log(result);
        idUser = result.user.id;
      },
      error => {
        console.log(error.error);
      },
      () => {
        this.isSubmitted = true;
        this.registerForm.reset();
        this.router.navigate(['admin/home']);
        this.snackBar.open("Volontario registrato con successo!", 'OK', {
          horizontalPosition: this.horizontalPosition,
          duration: this.durationInSeconds * 1000
        });
        axios.get(this.API_URL + "/api/sendmail/" + idUser);
      }
    )
  }

  goToHome() {
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    }
  }

}
