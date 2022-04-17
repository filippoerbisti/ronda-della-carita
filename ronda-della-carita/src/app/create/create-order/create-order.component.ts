import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
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
  isLoading = false;
  historyLoading = false;
  panelOpenState = false;
  client!: IClient;
  history: IOrder[] = [];
  invalidInput = false;
  invalidClothe = false;
  selectedReference!: any;
  nm = '';
  gen = '';
  search: IClient[] = [];
  myControl = new FormControl();
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

  // public tvestiariolv2 = [
  //   { reference: 'Giacca', value: 'Giaccone lungo' },
  //   { reference: 'Giacca', value: 'Giubbotto leggero' },
  //   { reference: 'Giacca', value: 'Giubbotto pesante' },
  //   { reference: 'Giacca', value: 'Spolverino impermeabile' },
  //   { reference: 'Giacca', value: 'Gilet imbottito' },
  //   { reference: 'Maglieria', value: 'Felpa senza cappuccio' },
  //   { reference: 'Maglieria', value: 'Felpa con cappuccio' },
  //   { reference: 'Maglieria', value: 'T-shirt' },
  //   { reference: 'Maglieria', value: 'Canottieria sportiva' },
  //   { reference: 'Maglieria', value: 'Maglia manica lunga' },
  //   { reference: 'Maglieria', value: 'Polo manica corta' },
  //   { reference: 'Maglieria', value: 'Maglione' },
  //   { reference: 'Camicia', value: 'Camicia pesante' },
  //   { reference: 'Camicia', value: 'Camicia manica lunga' },
  //   { reference: 'Camicia', value: 'Camicia manica corta' },
  //   { reference: 'Pantaloni', value: 'Pantaloni corti' },
  //   { reference: 'Pantaloni', value: 'Pantaloni lunghi jeans' },
  //   { reference: 'Pantaloni', value: 'Pantaloni lunghi altro' },
  //   { reference: 'Pantaloni', value: 'Tuta leggera' },
  //   { reference: 'Pantaloni', value: 'Tuta pesante' },
  //   { reference: 'Pantaloni', value: 'Tuta solo pantaloni' },
  //   { reference: 'Intimo', value: 'Slip' },
  //   { reference: 'Intimo', value: 'Boxer' },
  //   { reference: 'Intimo', value: 'Canottiera' },
  //   { reference: 'Calze', value: 'Calze lunghe' },
  //   { reference: 'Calze', value: 'Calze corte' },
  //   { reference: 'Calze', value: 'Calze fanstasmini' },
  //   { reference: 'Calze', value: 'Calze calzamaglia' },
  //   { reference: 'Scarpe', value: 'Ciabatte' },
  //   { reference: 'Scarpe', value: 'Scarpe da lavoro' },
  //   { reference: 'Scarpe', value: 'Scarponcino pesante' },
  //   { reference: 'Scarpe', value: 'Sportive' },
  //   { reference: 'Scarpe', value: 'Scarpe normali' },
  //   { reference: 'Accessori', value: 'Borsone' },
  //   { reference: 'Accessori', value: 'Cappello invernale' },
  //   { reference: 'Accessori', value: 'Cappello con visiera' },
  //   { reference: 'Accessori', value: 'Cintura' },
  //   { reference: 'Accessori', value: 'Guanti' },
  //   { reference: 'Accessori', value: 'Sciarpa' },
  //   { reference: 'Accessori', value: 'Valigia' },
  //   { reference: 'Accessori', value: 'Zaino piccolo' },
  //   { reference: 'Accessori', value: 'Zaino grande' },
  // ];

  public newClothe = {
    type: String,
    reference: String,
  };

  public clothes: any[] = [];

  public newOrder = {
    user: {
      id: '',
      name: '',
      surname: '',
    },
    note: '',
    p_ritiro: '',
    clothes: this.clothes,
    user_id: '',
  };

  public tvestiarioUseCaseMapping: any = sizes;

  tvestiarioValue: any = 'Maglia';
  clientValue: any = 'Uomo';
  tagliaValue: any = '';

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
    if (this.newOrder.user.name != "") {
      this.newOrder.user.name = this.client.nome;
    }
    console.log('NEW ORDER', this.newOrder);
    if (n_tessera) {
      try {
        let result = await axios.get(this.API_URL + '/api/client/by_tessera/' + n_tessera);
        console.log(result.data)
        this.client = result.data;
        this.newOrder.user.name = result.data.id + " - " + result.data.nome + " " + result.data.cognome;
        console.log("newOrder " + this.newOrder.user.name);
      } catch (error) {
        console.log("errore" + error);
      }
    }
    console.log(this.newOrder)
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

  filterStages() {
    let stages = this.stages.filter((stage) => {
      return stage.reference == this.stageReference;
    });

    return stages;
  }

  // public sea() {
  //   if(this.nm != ""){
  //     let nmo = this.nm.split(' ');
  //     for(var i = 0; i < this.clients.length; i++){
  //       if(this.clients[i].card?.n_tessera == nmo[0]){
  //         if(this.search.length == 0){
  //           this.search.push(this.clients[i]);
  //         }else{
  //           this.search.splice(0,this.search.length)
  //           this.search.push(this.clients[i]);
  //         }
  //       }
  //     }
  //   }
  //   this.change();
  // }
  // public change() {
  //   if(this.search.length != 0){
  //     if(this.search[0].param?.value== 'M')
  //       this.choseGender = "Uomo";
  //     else
  //       this.choseGender = "Donna"
  //     if(this.tvestiarioValue == 'Maglia')
  //       this.tagliaValue = this.search[0].t_maglietta;
  //     else if(this.tvestiarioValue == 'Scarpe')
  //       this.tagliaValue = this.search[0].t_scarpe;
  //     else
  //       this.tagliaValue = parseInt(this.search[0].t_pantaloni);
  //   }
  //   console.log(this.tagliaValue);

  // }

  private _filter(n_tessera: string): IClient[] {
    const filterValue = n_tessera.toLowerCase();
    return this.clients.filter((client) =>
      client.n_tessera.toString().toLowerCase().includes(filterValue)
    );
  }

  addClothe() {
    console.log(this.newClothe);

    if (this.checkNewClotheForm()) {
      this.invalidClothe = false;

      let clothe = this.newClothe;
      this.clothes.push(clothe);

      this.newClothe = {
        type: String,
        reference: String,
      };
      this.selectedReference = null;
    }
  }

  removeClothe(index: any) {
    this.clothes.splice(index, 1);
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
      let response = await axios.post(
        this.API_URL + '/api/order/create',
        this.newOrder
      );
      console.log(response.data);
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

  async clientHistory($event: any) {
    if ($event != "") {
      let temp: any = localStorage.getItem('user');
      this.newOrder.user_id = JSON.parse(temp).id;
      this.historyLoading = true;
      console.log($event);
      let id = '';
      let space = 0;
      for (let i = 0; i < $event.length; i++) {
        if ($event.charAt(i) != ' ') {
          id += $event.charAt(i);
        } else {
          space = i;
          break;
        }
      }
      let name = '';
      for (let i = space + 3; i < $event.length; i++) {
        if ($event.charAt(i) != ' ') {
          name += $event.charAt(i);
        } else {
          space = i;
          break;
        }
      }
      let surname = '';
      for (let i = space + 1; i < $event.length; i++) {
        if ($event.charAt(i) != ' ') {
          surname += $event.charAt(i);
        } else {
          space = i;
          break;
        }
      }
      this.newOrder.user.id = id;
      this.newOrder.user.name = name;
      this.newOrder.user.surname = surname;
      try {
        let response = await axios.get(
          this.API_URL + '/api/order/history/' + id
        );
        this.client = (
          await axios.get(this.API_URL + '/api/client/' + id)
        ).data;
        this.history = response.data;
      } catch (error) {
        console.log(error);
      }
      this.historyLoading = false;
    }
  }

  checkFields() {
    console.log(this.newOrder);

    this.newOrder.user.name != '' && this.newOrder.p_ritiro != ''
      ? (this.invalidInput = false)
      : (this.invalidInput = true);

    this.newOrder.clothes.length > 0
      ? (this.invalidClothe = false)
      : (this.invalidClothe = true);

    return !this.invalidInput && !this.invalidClothe ? true : false;
  }
}
