import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { WebElementPromise } from 'selenium-webdriver';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  // Data passed in by componentProps
  @Input() menu: any;



  constructor(private dataService: DataService,
    private modalController: ModalController,
    private router: Router) {
  }
  
  //Calculate Total
  calculateTotal() {
    var total = 0;
    this.menu.forEach(element => {
      console.log(element.precio);
      total += (parseInt(element.precio) * parseInt(element.cant));
    });
    console.log(total);
    return total;
  }

  //Realizar comprar
  comprar() {
    this.router.navigateByUrl("/menu/tabs/tab3");
    this.dismiss();
  }


  // Refresh input
  cambioValor(valor, plato) {
    plato.cant = parseInt(valor);
  }

  //Refresh
  doRefresh(event) {
    var cont = 0;
    this.menu.forEach(element => {
      
      if (element.cant == 0) {
        this.menu.splice(cont,1);
      }
      cont +=1
    });
  }

  // Dismiss Modal
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
