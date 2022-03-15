import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from 'axios';
import { IClient } from 'src/app/shared/interface/iclient';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { IOrder } from 'src/app/shared/interface/iorder';
import { IClotheType } from 'src/app/shared/interface/iClotheType';

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
  filteredClients: Observable<IClient[]> | undefined;

  choseGender = 'Uomo';
  genders: string[] = ['Uomo', 'Donna'];
  quantita = 1;

  // public tvestiario = [
  //   {value: "Maglietta"},
  //   {value: 'Pantaloni'},
  //   {value: 'Scarpe'},
  // ];

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
    reference: String
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

  // public tvestiarioUseCaseMapping: any = izes[] = [] {
  //   "maglietta": [
  //     {value: 'xs', viewValue: 'XS'},
  //     {value: 's', viewValue: 'S'},
  //     {value: 'm', viewValue: 'M'},
  //     {value: 'l', viewValue: 'L'},
  //     {value: 'xl', viewValue: 'XL'},
  //     {value: 'xxl', viewValue: 'XXL'},
  //   ],
  //   "pantaloni": [
  //     {value: 42, viewValue: 42},
  //     {value: 43, viewValue: 43},
  //     {value: 44, viewValue: 44},
  //     {value: 45, viewValue: 45},
  //     {value: 46, viewValue: 46},
  //     {value: 47, viewValue: 47},
  //     {value: 48, viewValue: 48},
  //     {value: 49, viewValue: 49},
  //     {value: 50, viewValue: 50},
  //     {value: 51, viewValue: 51},
  //     {value: 52, viewValue: 52},
  //     {value: 53, viewValue: 53},
  //     {value: 54, viewValue: 54},
  //     {value: 55, viewValue: 55},
  //     {value: 56, viewValue: 56},
  //     {value: 57, viewValue: 57},
  //     {value: 58, viewValue: 58},
  //   ],
  //   "scarpe": [
  //     {value: 36, viewValue: 36},
  //     {value: 37, viewValue: 37},
  //     {value: 38, viewValue: 38},
  //     {value: 39, viewValue: 39},
  //     {value: 40, viewValue: 40},
  //     {value: 41, viewValue: 41},
  //     {value: 42, viewValue: 42},
  //     {value: 43, viewValue: 43},
  //     {value: 44, viewValue: 44},
  //     {value: 45, viewValue: 45},
  //     {value: 46, viewValue: 46},
  //     {value: 47, viewValue: 47},
  //     {value: 48, viewValue: 48},
  //   ]
  // };

  tvestiarioValue: any = 'Maglia';
  clientValue: any = 'Uomo';
  tagliaValue: any = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  rule!: string;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    let n_tessera = this.route.snapshot.paramMap.get("n_tessera") ?? null;
    console.log(n_tessera);
    
    this.isLoading = true;

    if (n_tessera) {
      try {
        let result = await axios.get('http://localhost:8000/api/client/by_tessera/' + n_tessera)
      } catch (error) {
        console.log(error);
      }
    }

    try {
      let response = await axios.get(
        'http://localhost:8000/api/clients'
      );
      let tvestiariolv2 = await axios.get(
        "http://localhost:8000/api/clothes/options"
      )
      this.tvestiariolv2 = tvestiariolv2.data;
      this.clients = response.data;
      console.log(this.clients);
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.filteredClients = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nome)),
      map((nome) => (nome ? this._filter(nome) : this.clients.slice()))
    );
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

  // async createOrder() {
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
  //   try {
  //     let response = await axios.post(
  //       'http://localhost:8000/api/order/create',
  //       this.newOrder
  //     );
  //     this.router.navigateByUrl('/home/interno');
  //     this.snackBar.open('Ordine creato con successo!', '', {
  //       horizontalPosition: this.horizontalPosition,
  //       duration: this.durationInSeconds * 1000,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  addClothe() {
    console.log(this.newClothe);
    
    if (this.checkNewClotheForm()) {
      this.invalidClothe = false;
      
      let clothe = this.newClothe;
      this.clothes.push(clothe);

      this.newClothe = {
        type: String,
        reference: String
      };
      this.selectedReference = null
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
      console.log(this.newOrder.clothes[0]);
      let response = await axios.post(
        'http://localhost:8000/api/order/create',
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
    } else {
      console.log('NO NON PUOI');
    }
  }

  async clientHistory($event: any) {
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
        'http://localhost:8000/api/order/history/' + id
      );
      this.client = (
        await axios.get('http://localhost:8000/api/client/' + id)
      ).data;
      this.history = response.data;
    } catch (error) {
      console.log(error);
    }
    this.historyLoading = false;
  }

  checkFields() {
    console.log('checkFields');

    // check forms
    this.newOrder.user.name != '' && this.newOrder.p_ritiro != ''
      ? (this.invalidInput = false)
      : (this.invalidInput = true);
    // check if there's at least a clothe
    this.newOrder.clothes.length > 0
      ? (this.invalidClothe = false)
      : (this.invalidClothe = true);

    return !this.invalidInput && !this.invalidClothe ? true : false;
  }
}
