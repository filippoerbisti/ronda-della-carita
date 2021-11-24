import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  newUser = {
    nome: '',
    cognome: '',
    email: '',
    ruolo: '',
    email_verified_at: '',
    password: 'ok',
    remember_token: '',
    created_at: ''
  };

  isLoading = false;

  checked = false;

  rules: string[] = ['Admin', 'Volontario'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  constructor(
    private snackBar: MatSnackBar,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  goToHomeAdmin() {
    this.router.navigateByUrl('/home-admin');
  }

  async createUser() {
    // try {
    //   let response = await axios.post("http://127.0.0.1:8000/api/user/create", this.newUser);
    //   console.log(response.status);
    //   console.log(response.data);
    // }
    // catch (err) {
    //   console.log(err);
    // }
    // if(tuttto bene con i dati e salva nel db) {
//   this.router.navigateByUrl('/home-interno');
//   this.snackBar.open("Ordine creato con successo!", '', {
//   horizontalPosition: this.horizontalPosition,
//   duration: this.durationInSeconds * 1000
// })
// } else {
//   errore dati sbagliati o qualcosa non va
//   this.snackBar.open("Ordine creato con successo!", '', {
//   horizontalPosition: this.horizontalPosition,
//   duration: this.durationInSeconds * 1000
// })
// }
      this.router.navigateByUrl('/home-admin');
      this.snackBar.open("Volontario registrato con successo!", '', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })
  }

}
