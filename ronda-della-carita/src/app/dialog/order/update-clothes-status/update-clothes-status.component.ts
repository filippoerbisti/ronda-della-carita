import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { IOrder } from 'src/app/shared/interface/IOrder';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-update-clothes-status',
  templateUrl: './update-clothes-status.component.html',
  styleUrls: ['./update-clothes-status.component.css']
})

export class UpdateClothesStatusComponent implements OnInit {
  order!: IOrder;
  clothes: any = {};
  test!: {}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateClothesStatusComponent>,
  ) { }

  private API_URL = environment.API_URL;

  async ngOnInit() {

    this.order = (await axios.get(this.API_URL + "/api/order/" + this.data.orderId)).data
    console.log(this.order);

    this.order.clothes.forEach(clothe => {
      if (clothe.status.name == 'available' || clothe.status.name == 'not_available') {
        this.clothes[clothe.id] = clothe.status.name;
      }
     });
    

  }

  async updateClothesStatus() {
    try {
      let response = await axios.post(
        this.API_URL + '/api/clothes/status/update',
        this.clothes
      );
    } catch (error) {
      console.log(error);
      
      
    }
  }

}
