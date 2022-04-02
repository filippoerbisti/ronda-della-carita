import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { countries } from 'src/app/shared/store/country-data-store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  isLoading = false;
  errorMessage = '';

  user: any = localStorage.getItem('user');
  createClientForm!: FormGroup;

  genders: string[] = ['Uomo', 'Donna'];
  tdocuments: string[] = ["Carta d'Identità", 'Patente di Guida', 'Passaporto'];

  public countries: any = countries;

  public tMagliettas = sizes.filter((size) => size.type == 'Maglia');
  public tPantalonis = sizes.filter((size) => size.type == 'Pantaloni');
  public tScarpes = sizes.filter((size) => size.type == 'Scarpe');


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  rule!: string;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    public fb: FormBuilder
  ) {
    this.createClientForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      genere: ['', Validators.required],
      n_tessera: [null, Validators.required],
      document_id: [null, Validators.required],
      n_documento: [null, Validators.required],
      nazionalita: ['', Validators.required],
      t_maglietta: ['', Validators.required],
      t_pantaloni: ['', Validators.required],
      t_scarpe: [null, Validators.required],
      note: ['', Validators.required],
      user_id: JSON.parse(this.user).id,
    });
  }

  ngOnInit(): void { }

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

  async createClient() {
    try {
      let response = await axios.post(
        'https://backoffice-ronda.herokuapp.com/api/client/create',
        this.createClientForm.value
      );
      this.goToHome();
      this.snackBar.open('Assistito registrato con successo!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    } catch (err) {
      this.errorMessage = '';
      console.log(err);
      this.snackBar.open('ERRORE: Registrazione assistito fallita!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }
}
