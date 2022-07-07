import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { countries } from 'src/app/shared/store/country-data-store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { IClient } from 'src/app/shared/interface/IClient';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  isEdit = false;

  user: any = localStorage.getItem('user');
  createClientForm!: UntypedFormGroup;

  genders: string[] = ['Uomo', 'Donna'];
  tdocuments: string[] = ["Carta d'Identità", 'Patente', 'Passaporto'];
  clientId!: any;

  public countries: any = countries;

  public tMagliettas = sizes.filter((size) => size.type == 'Maglia');
  public tPantalonis = sizes.filter((size) => size.type == 'Pantaloni');
  public tScarpes = sizes.filter((size) => size.type == 'Scarpe');

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  rule!: string;

  private API_URL = environment.API_URL;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
  ) {
    this.createClientForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      genere: ['', Validators.required],
      n_tessera: [null, Validators.required],
      t_documento: ['', Validators.required],
      n_documento: [null, Validators.required],
      nazionalita: ['', Validators.required],
      t_maglietta: ['', Validators.required],
      t_pantaloni: ['', Validators.required],
      t_scarpe: [null, Validators.required],
      altezza: ['', Validators.required],
      note: ['', Validators.required],
      user_id: JSON.parse(this.user).id,
    });
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') ?? null;

    if (id) {
      this.isEdit = true;
      this.clientId = id;
      try {
        let client: IClient = (await axios.get(this.API_URL + "/api/client/" + id)).data
        this.createClientForm.patchValue(client)
        console.log(client.t_pantaloni);
        
        this.createClientForm.patchValue(
          {
            n_documento: client.document?.n_doc,
            t_documento: client.document?.t_doc,
          }
        );
      } catch (error) {
        console.log(error);

      }
    }
  }

  goToHome() {
    //route->home
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
      if (!this.isEdit) {
        let response = await axios.post(
          this.API_URL + '/api/client/create',
          this.createClientForm.value
        );
      } else {
        let response = await axios.put(
          this.API_URL + '/api/client/edit/' + this.clientId,
          this.createClientForm.value
        );
      }
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
