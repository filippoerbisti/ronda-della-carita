import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from "axios";
import { IClient } from 'src/app/shared/interface/iclient';

@Component({
  selector: 'app-ordine-interno',
  templateUrl: './ordine-interno.component.html',
  styleUrls: ['./ordine-interno.component.css']
})
export class OrdineInternoComponent implements OnInit {

  isLoading = false;  
  nm=""
  gen=""
  search: IClient[] = [];
  myControl = new FormControl();
  clients: IClient[] = [];
  filteredClients: Observable<IClient[]> | undefined;

  choseGender="Uomo"
  genders: string[] = ['Uomo', 'Donna'];
  quantita= 1;

  public tvestiario = [
    {value: 'maglietta', viewValue: "Maglietta"},
    {value: 'pantaloni', viewValue: 'Pantaloni'},
    {value: 'scarpe', viewValue: 'Scarpe'},
  ];

  public tvestiarioUseCaseMapping: any = {
    "maglietta": [
      {value: 'xs', viewValue: 'XS'},
      {value: 's', viewValue: 'S'},
      {value: 'm', viewValue: 'M'},
      {value: 'l', viewValue: 'L'},
      {value: 'xl', viewValue: 'XL'},
      {value: 'xxl', viewValue: 'XXL'},
    ], 
    "pantaloni": [
      {value: 42, viewValue: 42},
      {value: 43, viewValue: 43},
      {value: 44, viewValue: 44},
      {value: 45, viewValue: 45},
      {value: 46, viewValue: 46},
      {value: 47, viewValue: 47},
      {value: 48, viewValue: 48},
      {value: 49, viewValue: 49},
      {value: 50, viewValue: 50},
      {value: 51, viewValue: 51},
      {value: 52, viewValue: 52},
      {value: 53, viewValue: 53},
      {value: 54, viewValue: 54},
      {value: 55, viewValue: 55},
      {value: 56, viewValue: 56},
      {value: 57, viewValue: 57},
      {value: 58, viewValue: 58},
    ],
    "scarpe": [
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
      {value: 47, viewValue: 47},
      {value: 48, viewValue: 48},
    ]
  };

  tvestiarioValue: any= 'maglietta';
  clientValue: any = 'Uomo';
  tagliaValue: any= ''

  constructor(public dialog: MatDialog) {
  }
  
  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/clients");
      console.log(response.status);
      console.log(response.data);
      this.clients = response.data;
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
  public sea(){
    if(this.nm!=""){
      let nmo=this.nm.split(' ');
      for(var i=0; i<this.clients.length;i++){
        if(this.clients[i].nome==nmo[0] && this.clients[i].cognome==nmo[1]){
          if(this.search.length==0){
            this.search.push(this.clients[i]);
          }else{
            this.search.splice(0,this.search.length)
            this.search.push(this.clients[i]);
          }
        }
      } 
    }
    this.change()
  }
  public change(){
    if(this.search.length!=0){
      if(this.search[0].genere=='M')
        this.choseGender="Uomo";
      else
        this.choseGender="Donna"
      if(this.tvestiarioValue=='maglietta')
        this.tagliaValue=this.search[0].t_maglietta;
      else if(this.tvestiarioValue=='scarpe')
        this.tagliaValue=this.search[0].t_scarpe;
      else
        this.tagliaValue=parseInt(this.search[0].t_pantaloni);
    }
  }
  /*ngDoCheck() {
    console.log(typeof this.tagliaValue)
  }*/
  private _filter(nome: string): IClient[] {
    const filterValue = nome.toLowerCase();

    return this.clients.filter(client => client.nome.toLowerCase().includes(filterValue));
  }
}