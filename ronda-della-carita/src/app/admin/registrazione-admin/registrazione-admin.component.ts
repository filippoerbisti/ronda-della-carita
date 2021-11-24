import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from "axios";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { countries } from 'src/app/shared/store/country-data-store';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Document {
  value: string;
  viewValue: string;
}

interface Value {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-registrazione-admin',
  templateUrl: './registrazione-admin.component.html',
  styleUrls: ['./registrazione-admin.component.css']
})
export class RegistrazioneAdminComponent implements OnInit {

  isLoading = false;

  // newClient = {
  //   nome: '',
  //   cognome: '',
  //   genere: 'M',
  //   n_documento: '',
  //   t_documento: '',
  //   nazionalita: '',
  //   t_maglietta: '',
  //   t_pantaloni: '',
  //   t_scarpe: ''
  // };

  genders: string[] = ['Uomo', 'Donna'];

  tdocuments: Document[] = [
    {value: 'cartaid', viewValue: "Carta d'Identità"},
    {value: 'patente', viewValue: 'Patente di Guida'},
    {value: 'passaport', viewValue: 'Passaporto'},
  ];

  public countries:any = countries;

  tmagliettas: Document[] = [
    {value: 'xs', viewValue: 'XS'},
    {value: 's', viewValue: 'S'},
    {value: 'm', viewValue: 'M'},
    {value: 'l', viewValue: 'L'},
    {value: 'xl', viewValue: 'XL'},
    {value: 'xxl', viewValue: 'XXL'},
  ];

  tpantalonis: Value[] = [
    {value: 42, viewValue: 42},
    {value: 44, viewValue: 44},
    {value: 46, viewValue: 46},
    {value: 48, viewValue: 48},
    {value: 50, viewValue: 50},
    {value: 52, viewValue: 52},
    {value: 54, viewValue: 54},
    {value: 56, viewValue: 56},
    {value: 58, viewValue: 58},
  ];

  tscarpes: Value[] = [
    {value: 36, viewValue: 36},
    {value: 37, viewValue: 37},
    {value: 38, viewValue: 38},
    {value: 39, viewValue: 39},
    {value: 40, viewValue: 40},
    {value: 41, viewValue: 41},
    {value: 42, viewValue: 42},
    {value: 43, viewValue: 43},
    {value: 44, viewValue: 44},
    {value: 45, viewValue: 45},
    {value: 46, viewValue: 46},
  ];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;
  
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router:Router
    ) { }

  ngOnInit(): void {
  }

  goToHomeAdmin() {
    this.router.navigateByUrl('/home-admin');
  }

  createClient() {
    //try {
//     let response = await axios.put("http://127.0.0.1:8000/api/client/create", this.newClient);
//     console.log(response.data);
//   }
//   catch (err) {
//     console.log(err);
//   }
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
      this.snackBar.open("Assistito registrato con successo!", '', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })
  }

}
