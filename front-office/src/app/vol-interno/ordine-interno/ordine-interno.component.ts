import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ordine-interno',
  templateUrl: './ordine-interno.component.html',
  styleUrls: ['./ordine-interno.component.css']
})
export class OrdineInternoComponent implements OnInit {

  isLoading = false;  

  //choseGender!: string;
  genders: string[] = ['Uomo', 'Donna', 'Altro'];

  public tvestiario = [
    {value: 'maglietta', viewValue: "Maglietta"},
    {value: 'pantaloni', viewValue: 'Pantaloni'},
    {value: 'scarpe', viewValue: 'Scarpe'},
  ];

  public tagliaMapping = {
    "maglietta": [
      {value: 'xs', viewValue: 'XS'},
      {value: 's', viewValue: 'S'},
      {value: 'm', viewValue: 'M'},
      {value: 'l', viewValue: 'L'},
      {value: 'xl', viewValue: 'XL'},
      {value: 'xxl', viewValue: 'XXL'},
    ], 
    "pantaloni": [
      {value: '42', viewValue: '42'},
      {value: '44', viewValue: '44'},
      {value: '46', viewValue: '46'},
      {value: '48', viewValue: '48'},
      {value: '50', viewValue: '50'},
      {value: '52', viewValue: '52'},
      {value: '54', viewValue: '54'},
      {value: '56', viewValue: '56'},
      {value: '58', viewValue: '58'},
    ],
    "scarpe": [
      {value: '36', viewValue: '36'},
      {value: '37', viewValue: '37'},
      {value: '38', viewValue: '38'},
      {value: '39', viewValue: '39'},
      {value: '40', viewValue: '40'},
      {value: '41', viewValue: '41'},
      {value: '42', viewValue: '42'},
      {value: '43', viewValue: '43'},
      {value: '44', viewValue: '44'},
      {value: '45', viewValue: '45'},
      {value: '46', viewValue: '46'},
    ]
  };

  selectedTvestiario: string = "maglietta";

  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
  }

}
