import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { countries } from 'src/app/shared/store/country-data-store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { IClient } from 'src/app/shared/interface/iclient';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  isLoading = false;
  errorMessage = '';

  // public newClient!: IClient;
  user: any = localStorage.getItem('user');
  createClientForm!: FormGroup;

  genders: string[] = ['Uomo', 'Donna'];
  tdocuments: string[] = ["Carta d'Identità", 'Patente di Guida', 'Passaporto'];

  public countries: any = countries;
  public tvestiarioUseCaseMapping: any = sizes;

  public tMagliettas = sizes.filter((size) => size.type == 'Maglia');
  public tPantalonis = sizes.filter((size) => size.type == 'Pantaloni');
  public tScarpes = sizes.filter((size) => size.type == 'Scarpe');
  // public tmagliettas = sizes.filter(size => size.type == 'Pantaloni');
  // public tmagliettas = sizes.filter(size => size.type == 'Scarpe');

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

  ngOnInit(): void {}

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
    // console.log(this.createClientForm.value);

    try {
      let response = await axios.post(
        'http:/backoffice-ronda.herokuapp.com/api/client/create',
        this.createClientForm.value
      );
      this.goToHome();
      
    } catch (err) {
      this.errorMessage = '';
      console.log(err);
    }
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
    // this.router.navigateByUrl('/home-interno');
    // this.snackBar.open("Assistito registrato con successo!", '', {
    //   horizontalPosition: this.horizontalPosition,
    //   duration: this.durationInSeconds * 1000
    // })
  }
}

// tmagliettas: Document[] = [
//   {value: 'xs', viewValue: 'XS'},
//   {value: 's', viewValue: 'S'},
//   {value: 'm', viewValue: 'M'},
//   {value: 'l', viewValue: 'L'},
//   {value: 'xl', viewValue: 'XL'},
//   {value: 'xxl', viewValue: 'XXL'},
// ];

// tpantalonis: Value[] = [
//   {value: 42, viewValue: 42},
//   {value: 44, viewValue: 44},
//   {value: 46, viewValue: 46},
//   {value: 48, viewValue: 48},
//   {value: 50, viewValue: 50},
//   {value: 52, viewValue: 52},
//   {value: 54, viewValue: 54},
//   {value: 56, viewValue: 56},
//   {value: 58, viewValue: 58},
// ];

// tscarpes: Value[] = [
//   {value: 36, viewValue: 36},
//   {value: 37, viewValue: 37},
//   {value: 38, viewValue: 38},
//   {value: 39, viewValue: 39},
//   {value: 40, viewValue: 40},
//   {value: 41, viewValue: 41},
//   {value: 42, viewValue: 42},
//   {value: 43, viewValue: 43},
//   {value: 44, viewValue: 44},
//   {value: 45, viewValue: 45},
//   {value: 46, viewValue: 46},
// ];
