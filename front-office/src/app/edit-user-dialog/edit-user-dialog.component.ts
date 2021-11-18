import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface User {
  id: number,
  nome: string,
  cognome: string,
  ruolo: string,
  interno: boolean,
  email: string,
  //email_verified_at: timestamp,
  password: string,
  remember_token: string,
  created_at: Date,
  //update_at: timestamp
};

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  isLoading = false;

  users: User[] = [];

  checked = false;

  rules: string[] = ['Admin', 'Volontario'];

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/users");
      console.log(response.status);
      console.log(response.data);
      this.users = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
  editUser() {

  }
}
