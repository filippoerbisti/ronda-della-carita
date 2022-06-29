import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from "axios";

interface StepInterface {
  title: string,
  description: string,
  confirmLabel: string
};

interface Steps {
  [key: string]: StepInterface
}

@Component({
  selector: 'app-invalid-client-data-dialog',
  templateUrl: './invalid-client-data-dialog.component.html',
  styleUrls: ['./invalid-client-data-dialog.component.css'],
})



export class InvalidClientDataDialogComponent implements OnInit {

  private API_URL = environment.API_URL;

  public tMagliettas = sizes.filter((size) => size.type == 'Maglia');
  public tPantalonis = sizes.filter((size) => size.type == 'Pantaloni');
  public tScarpes = sizes.filter((size) => size.type == 'Scarpe');
  createClientForm!: FormGroup;
  
  state = "form"
  client = this.data.client

  steps: Steps = {
    // alert: {
    //   title: "Dati assistito mancanti",
    //   description: "Mancano alcuni dati riguardanti l'assistito per completare la creazione dell'ordine, compilarli per completare la creazione.",
    //   confirmLabel: "MODIFICA"
    // },
    form: {
      title: "Modifica",
      description: "Mancano alcuni dati riguardanti l'assistito per completare la creazione dell'ordine, compilarli per completare la creazione.",
      confirmLabel: "CONFERMA"
    },
    loading: {
      title: "Caricamento",
      description: "",
      confirmLabel: ""
    },
    success: {
      title: "Dati assistito aggiornati",
      description: "Taglie assistito aggiornate con successo!",
      confirmLabel: "CONTINUA"
    },
    error: {
      title: "Errore",
      description: "Errore durante l'aggiornamento dei dati dell'assistito",
      confirmLabel: "RIPROVA"
    },
  }


  constructor(
    public dialogRef: MatDialogRef<InvalidClientDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {
    this.createClientForm = this.fb.group({
      t_maglietta: [this.client.t_maglietta, Validators.required],
      t_pantaloni: [this.client.t_pantaloni, Validators.required],
      t_scarpe: [this.data.t_scarpe, Validators.required],
      altezza: [this.data.altezza, Validators.required],
    });
  }

  ngOnInit(): void {
    // console.log("data", this.data.client.t_maglietta);
    // console.log("step", this.currentStep());
  }


  async editCustomer() {
    console.log("edit customer function");
    try {
      let url = this.API_URL + `/api/client/update-sizes/` + this.client.id;
      console.log(url);
      let response = await axios.put(url, this.createClientForm.value);
      this.state = "success"
    } catch (error) {
      console.log(error);
      this.state = "error"
    }
  }

  currentStep() {

    return this.steps[this.state];
  }

  // states = alert, form, loading, success, error

  async goForward() {
    switch (this.state) {
      case "form":
        await this.editCustomer()
        break;
      case "success":
        this.dialogRef.close()
        break;
      case "loading":
        break;
      case "error":
        this.state = "form"
        break;

      default:
        break;
    }
  }

}
