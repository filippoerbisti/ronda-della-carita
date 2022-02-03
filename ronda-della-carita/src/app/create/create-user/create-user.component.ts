import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interface/iuser';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  isLoading = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  newUser!: IUser;

  rules: string[] = ['Admin', 'Volontario'];

  currentRoute!: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  constructor(
    private snackBar: MatSnackBar,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  goToHome() {
    this.router.navigateByUrl('/home/admin');
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
      this.router.navigateByUrl('/home/admin');
      this.snackBar.open("Volontario registrato con successo!", '', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })
  }

}
