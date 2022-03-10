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
    var html = 
    `<p class="pt-8 text-center text-xl">RIEPILOGO ORDINE N. <span class="bold">${this.orderPDF.n_ordine}</span></p>
    <div class="flex w-full">
        <div class="flex flex-col w-full text-lg">
            <p>Destinatario</p>
            <p>${this.orderPDF.client?.nome} ${this.orderPDF.client?.cognome} - N. Tessera ${this.orderPDF.client?.n_tessera}</p>
            <p>Ritiro presso: ${this.orderPDF.p_ritiro}</p>
            <p>Livello: ${this.orderPDF.livello}</p>
            <p>Ordine N. <span class="bold">${this.orderPDF.n_ordine}</span></p>
            <div class="border-2 p-auto">
                <div *ngFor="let ${this.clothe} of ${this.orderPDF.clothes}">
                    <table class="w-full my-4 mx-4">
                        <tr>
                            <td>Tipo vestiario</td>
                            <td>Genere</td>
                            <td>Taglia</td>
                            <td>Quantità</td>
                        </tr>
                        <tr>
                            <td>${ this.clothe.t_vestiario }</td>
                            <td>${ this.clothe.taglia }</td>
                            <td>${ this.clothe.taglia }</td>
                            <td>${ this.clothe.quantita }</td>
                        </tr>
                    </table>
                </div>
            </div>
            <p class="text-right pt-4">Creato da ${this.orderPDF.user?.nome} ${this.orderPDF.user?.cognome}</p>
            <p class="text-right">N. Tessera ${this.orderPDF.user?.n_tessera}</p>
        </div>
    </div>`;
    var doc = new jsPDF();
    doc.html(html, {
      callback: function (doc) {
        doc.save();
      },
    });
  //   let element: any = document.getElementById('viewPDF');
  //   var doc = new jsPDF('l', 'pt', 'a4');
  //   // doc.html(element).then(()=>doc.save('test.pdf'));
  //   doc.html(document.body, {
  //     callback: function (doc) {
  //       doc.save();
  //     }
  //  });
    // html2canvas(element, doc.canvas).then(()=>doc.save('test.pdf'));
  }

  public async savePDF() {  
    // html2canvas(html).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'pt', 'a4');
      let html:any = 'ok';

    //   var width = pdf.internal.pageSize.getWidth();
    //   var height = pdf.internal.pageSize.getHeight();
      // var height = canvas.height * width / canvas.width;
     pdf.setDisplayMode(1, 'single', 'UseThumbs');
      // pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      let div = `<div class="w-2/3 mx-auto px-10 pb-auto">
      <img src="../../assets/ronda-della-carita.png" alt="" class="mx-auto w-1/2 h-70 pt-4">
      <p class="pt-8 text-center text-xl">RIEPILOGO ORDINE N. <span class="bold">{{orderPDF.n_ordine}}</span></p>
      <div class="flex w-full">
          <div class="flex flex-col w-full text-lg">
              <p>Destinatario</p>
              <p>{{orderPDF.client?.nome}} {{orderPDF.client?.cognome}} - N. Tessera {{orderPDF.client?.n_tessera}}</p>
              <p>Ritiro presso: {{orderPDF.p_ritiro}}</p>
              <p>Livello: {{orderPDF.livello}}</p>
              <p>Ordine N. <span class="bold">{{orderPDF.n_ordine}}</span></p>
              <div class="border-2 p-auto">
                  <div *ngFor="let clothe of orderPDF.clothes">
                      <table class="w-full my-4 mx-4">
                          <tr>
                              <td>Tipo vestiario</td>
                              <td>Genere</td>
                              <td>Taglia</td>
                              <td>Quantità</td>
                          </tr>
                          <tr>
                              <td>{{ clothe.t_vestiario }}</td>
                              <td>{{ clothe.taglia }}</td>
                              <td>{{ clothe.taglia }}</td>
                              <td>{{ clothe.quantita }}</td>
                          </tr>
                      </table>
                  </div>
              </div>
              <p class="text-right pt-4">Creato da {{orderPDF.user?.nome}} {{orderPDF.user?.cognome}}</p>
              <p class="text-right">N. Tessera {{orderPDF.user?.n_tessera}}</p>
              
          </div>
      </div>
  </div>`;
      let ok = '<h1>DIONEGRO</h1>';
      pdf.html(ok);
      console.log(pdf.getCurrentPageInfo());

    pdf.save(`order_n_${this.orderPDF.n_ordine}.pdf`); 

    this.snackBar.open("Documento salvato con successo!", 'OK', {
      horizontalPosition: this.horizontalPosition,
      duration: this.durationInSeconds * 1000
    })
    // });

    // let pdf = new jsPDF('p', 'pt', 'a4');

    
  }  

  goBack() {
    if (this.router.url.includes('vol1')) {
      this.router.navigateByUrl('vol1/home');
    }
    if (this.router.url.includes('vol0')) {
      this.router.navigateByUrl('vol0/home');
    }
  }

  print() {

  }


}
