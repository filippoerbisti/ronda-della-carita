import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from "axios";
import { IClient } from 'src/app/shared/interface/iclient';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { IOrder } from 'src/app/shared/interface/iorder';

export interface IClothes {
  type: string,
  size: string,
  number: number
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  isLoading = false;
  historyLoading = false;
  panelOpenState = false;
  client!:IClient;
  history:IOrder[]=[];
  invalidInput = false;
  invalidClothe = false;
  nm = "";
  gen = "";
  search: IClient[] = [];
  myControl = new FormControl();
  clients: IClient[] = [];
  filteredClients: Observable<IClient[]> | undefined;

  choseGender = "Uomo";
  genders: string[] = ['Uomo', 'Donna'];
  quantita = 1;

  public tvestiario = [
    {value: "Maglietta"},
    {value: 'Pantaloni'},
    {value: 'Scarpe'},
  ];

  public newClothe = {
    type: String,
  };

  public clothes : any[] = [];

  public newOrder = {
    user: {
      id: "",
      name: "",
      surname: ""
    },
    note: "",
    p_ritiro: "",
    clothes: this.clothes,
    user_id: ""
  };


  public tvestiarioUseCaseMapping:any = sizes;

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
    public router:Router
    ) {}
  
  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("https://backoffice-ronda.herokuapp.com/api/clients");
      console.log(response.status);
      console.log(response.data);
      this.clients=response.data;
      console.log(this.clients);
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.filteredClients = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filter(nome) : this.clients.slice())),
    );
  }

  goToHome() {
    if (window.location.href.includes('vol1')) {
      this.rule =  'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    } else if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    }
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
    return this.clients.filter(client => client.n_tessera.toString().toLowerCase().includes(filterValue));
  }

  test() {
    console.log('oooo');
    
  }

  createOrder() {
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
    this.router.navigateByUrl('/home/interno');
    this.snackBar.open("Ordine creato con successo!", '', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })
  }

  addClothe() {
    if (this.checkNewClotheForm()) {
      this.invalidClothe = false;
      let clothe = this.newClothe;
      this.clothes.push(clothe); 
      this.newClothe = {
        type: String,
      }
    }
  }

  removeClothe(index: any) {
    this.clothes.splice(index, 1)
  }

  checkNewClotheForm(){
    if (this.newClothe.type != String) {
      return true
    } else {
      return false
    }
  }

  async create(){
    if (this.checkFields()) {
      console.log(this.newOrder.clothes[0]);
      let response = await axios.post("http://localhost:8000/api/order/create",this.newOrder);
      console.log(response.data);
      if (window.location.href.includes('vol1')) {
        this.rule =  'vol1';
        this.router.navigateByUrl(`/${this.rule}` + '/home');
      } else if (window.location.href.includes('vol0')) {
        this.rule =  'vol0';
        this.router.navigateByUrl(`/${this.rule}` + '/home');
      } else if (window.location.href.includes('admin')) {
        this.rule = 'admin';
        this.router.navigateByUrl(`/${this.rule}` + '/home');
      }
    } else {
      console.log('NO NON PUOI');
    }
  }

  async clientHistory($event:any){
    let temp:any=localStorage.getItem("user");
    this.newOrder.user_id=JSON.parse(temp).id;
    this.historyLoading = true;
    console.log($event)
    let id="";
    let space=0;
    for(let i=0; i<$event.length; i++){
      if($event.charAt(i)!=" "){
        id+=$event.charAt(i);
      }else{
        space=i;
        break;
      }
    }
    let name="";
    for(let i=space+3; i<$event.length; i++){
      if($event.charAt(i)!=" "){
        name+=$event.charAt(i);
      }else{
        space=i;
        break;
      }
    }
    let surname="";
    for(let i=space+1; i<$event.length; i++){
      if($event.charAt(i)!=" "){
        surname+=$event.charAt(i);
      }else{
        space=i;
        break;
      }
    }
    this.newOrder.user.id=id;
    this.newOrder.user.name=name;
    this.newOrder.user.surname=surname;
    try {
      let response = await axios.get("http://localhost:8000/api/order/history/"+id);
      this.client = (await axios.get("http://localhost:8000/api/client/"+id)).data;
      this.history=response.data;
    } catch (error) {
      console.log(error);
      
    }
    this.historyLoading = false;
  }

  checkFields(){
    console.log('checkFields');
    
    // check forms
    this.newOrder.user.name != "" && this.newOrder.p_ritiro != "" ? this.invalidInput = false : this.invalidInput = true
    // check if there's at least a clothe
    this.newOrder.clothes.length > 0 ? this.invalidClothe = false : this.invalidClothe = true

    return (!this.invalidInput && !this.invalidClothe ? true : false)
  }

}