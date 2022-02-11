import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseMansionDialogComponent } from '../dialog/mansion/choose-mansion-dialog/choose-mansion-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IUser } from '../shared/interface/iuser';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  user!: IUser;

  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  async login() {
    let response = await axios.post("https://backoffice-ronda.herokuapp.com/api/login", this.user);
    const dialogRef = this.dialog.open(ChooseMansionDialogComponent);

  }

  registration() {
    this.router.navigateByUrl('/admin/home');
  }

}
