import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { IClient } from 'src/app/shared/interface/IClient';
import { IOrder } from 'src/app/shared/interface/IOrder';
import { IClotheType } from 'src/app/shared/interface/IClotheType';
import { IStage } from 'src/app/shared/interface/IStage';
import Integer from '@zxing/library/esm/core/util/Integer';
import { InvalidClientDataDialogComponent } from 'src/app/dialog/invalid-client-data-dialog/invalid-client-data-dialog.component';

export interface IClothes {
  type: string;
  size: string;
  number: number;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  showSearch = false;
  searchFilter = "";
  isLoading = false;
  historyLoading = false;
  panelOpenState = false;
  client!: IClient;
  history: IOrder[] = [];
  invalidInput = false;
  invalidClothe = false;
  selectedClientId!: Integer;
  selectedReference!: any;
  nm = '';
  gen = '';
  search: IClient[] = [];
  myControl = new UntypedFormControl();
  clients: IClient[] = [];
  tvestiariolv2: IClotheType[] = [];
  stageReference!: any;
  stages: IStage[] = [];
  filteredClients: Observable<IClient[]> | undefined;


  choseGender = 'Uomo';
  genders: string[] = ['Uomo', 'Donna'];
  quantita = 1;

  public tvestiariolv1 = [
    { value: 'Giacca' },
    { value: 'Maglieria' },
    { value: 'Camicia' },
    { value: 'Pantaloni' },
    { value: 'Intimo' },
    { value: 'Calze' },
    { value: 'Scarpe' },
    { value: 'Accessori' },
  ];

  public giri = [
    { value: 'Giro 1' },
    { value: 'Giro 2' },
    { value: 'Giro 3' },
    { value: 'Colazioni' },
  ];


  public newClothe = {
    type: String,
    reference: String,
  };

  public clothes: any[] = [];

  public newOrder = {
    // client: {
    //   id: '',
    //   nome: '',
    //   cognome: '',
    // },
    client: {} as IClient,
    note: '',
    giro: '',
    p_ritiro: '',
    clothes: [] as any[],
    user_id: '',
  };

  public tvestiarioUseCaseMapping: any = sizes;

  tvestiarioValue: any = 'Maglia';
  clientValue: any = 'Uomo';
  tagliaValue: any = '';
  isEdit = false;
  orderId!: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  rule!: string;

  private API_URL = environment.API_URL;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    let n_tessera = this.route.snapshot.paramMap.get('n_tessera') ?? null;

    this.isLoading = true;
    this.orderId = this.route.snapshot.paramMap.get('id') ?? null;

    if (this.orderId) {
      this.isEdit = true;
      try {
        let order = (await axios.get(this.API_URL + "/api/order/" + this.orderId)).data
        this.newOrder = order;
      } catch (error) {

      }
    }

    try {
      let response = await axios.get(this.API_URL + '/api/clients');
      let tvestiariolv2 = await axios.get(this.API_URL + '/api/clothes/options');
      let stages = await axios.get(this.API_URL + '/api/stages/options');
      this.tvestiariolv2 = tvestiariolv2.data;
      this.stages = stages.data;
      this.clients = response.data;
      console.log(this.clients);
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.filteredClients = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nome)),
      map((nome) => (nome ? this._filter(nome) : this.clients.slice()))
    );
    if (this.newOrder.client.nome != "") {
      this.newOrder.client.nome = this.newOrder.client.nome;
    }
    if (n_tessera) {
      try {
        let result = await axios.get(this.API_URL + '/api/client/by_tessera/' + n_tessera);
        console.log(result.data)
        this.client = result.data;
        this.newOrder.client.nome = result.data.id + " - " + result.data.nome + " " + result.data.cognome;
        console.log("newOrder " + this.newOrder.client.nome);
      } catch (error) {
        console.log("errore" + error);
      }
    }
  }

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

  filterClothes() {
    let clothes = this.tvestiariolv2.filter((clothe) => {
      return clothe.reference == this.selectedReference;
    });

    return clothes;
  }

  pairClothes(clothesModel: any) {
    clothesModel.forEach((clothe: any) => {
      this.newOrder.clothes.push({
        value: clothe.t_vestiario
      })
    });
  }

  filterStages() {
    let stages = this.stages.filter((stage) => {
      return stage.reference == this.newOrder.giro;
    });

    return stages;
  }

  private _filter(n_tessera: string): IClient[] {
    const filterValue = n_tessera.toLowerCase();
    return this.clients.filter((client) =>
      client.n_tessera.toString().toLowerCase().includes(filterValue)
    );
  }

  canAddClothe() {
    if (!this.newOrder.client) {
      return false
    }

    if (!this.userDataComplete()) {
      return false;
    }
    return true
  }

  addClothe() {

    if (this.checkNewClotheForm()) {
      this.invalidClothe = false;

      let clothe = this.newClothe;
      this.newOrder.clothes.push(clothe);

      this.newClothe = {
        type: String,
        reference: String,
      };

      this.selectedReference = null;
    }
  }

  removeClothe(index: any) {
    this.newOrder.clothes.splice(index, 1);
  }

  checkNewClotheForm() {
    if (this.newClothe.type != String) {
      return true;
    } else {
      return false;
    }
  }

  async create() {
    if (this.checkFields()) {
      console.log(this.newOrder);
      if (!this.isEdit) {
        let response = await axios.post(
          this.API_URL + '/api/order/create',
          this.newOrder
        );
      } else {
        let response = await axios.put(
          this.API_URL + '/api/order/edit/' + this.orderId,
          this.newOrder
        );
      }
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
      this.snackBar.open('Ordine creato con successo!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this.snackBar.open('ERRORE: Ordine non creato!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }


  userDataComplete() {

    if (!this.newOrder.client.t_maglietta || !this.newOrder.client.t_pantaloni || !this.newOrder.client.t_scarpe || !this.newOrder.client.altezza) {
      return false;
    } else {
      return true;
    }
  }

  checkFields() {
    console.log(this.newOrder);

    this.newOrder.client.nome != '' && this.newOrder.p_ritiro != ''
      ? (this.invalidInput = false)
      : (this.invalidInput = true);

    this.newOrder.clothes.length > 0
      ? (this.invalidClothe = false)
      : (this.invalidClothe = true);

    console.log(this.newOrder.clothes);


    return !this.invalidInput && !this.invalidClothe ? true : false;
  }

  closeSearch() {
    setTimeout(() => {
      this.showSearch = false;
    }, 150);

  }


  filterClients() {
    // TODO: change to Iclient interface
    let clients: IClient[] = [];
    if (this.searchFilter == "") {
      clients = this.clients
    } else {
      clients = this.clients.filter((client: IClient) => {
        let name = `${client.n_tessera} ${client.nome.toLowerCase()} ${client.cognome.toLowerCase()}`
        return name.replace(/\s/g, "").includes(this.searchFilter.toLowerCase().replace(/\s/g, ""))
      })
    }

    return clients
  }

  async selectClient(client: IClient) {

    this.newOrder.client = client
    this.searchFilter = `${client.n_tessera} - ${client.nome} ${client.cognome}`
    let userDataComplete = this.userDataComplete()

    if (!userDataComplete) {
      const dialogRef = this.dialog.open(InvalidClientDataDialogComponent, {
        data: {
          client: this.newOrder.client
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        this.newOrder.client = (await axios.get(this.API_URL + '/api/client/' + client.id)).data;
      })
    }
    this.historyLoading = true;
    this.history = (await axios.get(this.API_URL + '/api/order/history/' + client.id)).data;
    this.historyLoading = false;
  }
}
