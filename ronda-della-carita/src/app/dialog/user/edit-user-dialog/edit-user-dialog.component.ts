import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IUser } from 'src/app/shared/interface/IUser';
import { environment } from 'src/environments/environment';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  isLoading = false;

  user!: IUser;
  userId!: number;

  checked = false;

  rules: string[] = ['Admin', 'Volontario'];

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage["idEditUser"];
    let userId = this.userId;
    try {
      let response = await axios.get(this.API_URL + "/api/user/" + userId);
      this.user = response.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("idEditUser");
  }

  editUser() {
    window.location.reload();
  }
}
