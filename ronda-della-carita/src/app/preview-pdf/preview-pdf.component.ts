import { Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
import { IOrder } from '../shared/interface/iorder';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { IClothe } from '../shared/interface/iclothe';


@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent implements OnInit {


  @ViewChild('viewPDF', { static: false}) divViewPDF!: ElementRef;

  orderPDF!: IOrder;
  clothe!: IClothe;

  isLoading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    let n_ordine = this.route.snapshot.paramMap.get("n_ordine");
    try {
      let response_order_pdf= await axios.get("https://backoffice-ronda.herokuapp.com/api/order/" + n_ordine);
      this.orderPDF = response_order_pdf.data;
      this.isLoading = false;
    } 
    catch (err) {
      console.log(err);
    }
    
  }

  public savePD() {
    let html: any = document.getElementById('viewPDF');
    var doc = new jsPDF('portrait', 'mm', 'a4');
   
    doc.html(html, {
      callback: function (doc) {
        doc.save();
      },
    });

    html2canvas(html).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      // doc.setFontSize(40);
      doc.setDisplayMode(0.5, "continuous", "UseOutlines")
      // doc.splitTextToSize(html, 7.5);
      // doc.text('Paranyan loves jsPDF',35, 25);
      var height = 
      doc.addImage(contentDataURL, 'JPEG', 15, 40, 210, 297);
    });
  }

  public async savePDF() {  
    // html2canvas(html).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'pt', 'a4');
      let html:any = 'ok';

    //   var width = pdf.internal.pageSize.getWidth();
    //   var height = pdf.internal.pageSize.getHeight();
      // var height = canvas.height * width / canvas.width;
     
      // pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);

      let ok = '<h1>DIONEGRO</h1>';
      pdf.html(ok);
      console.log(pdf.getCurrentPageInfo());

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

    this.snackBar.open("Documento salvato con successo!", 'OK', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })    
  }  

  goBack() {
    if (this.router.url.includes('vol1')) {
      this.router.navigateByUrl('vol1/home');
    }
    if (this.router.url.includes('vol0')) {
      this.router.navigateByUrl('vol0/home');
    }
    if (this.router.url.includes('admin')) {
      this.router.navigateByUrl('admin/home');
    }
  }

  print() {

  }


}
