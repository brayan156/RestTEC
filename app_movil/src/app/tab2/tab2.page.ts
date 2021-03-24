import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { WebElementPromise } from 'selenium-webdriver';
import { Pedido } from '../objetos/pedido';
import { PlatoApp } from '../objetos/plato-app';
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
    private router: Router,
    public alertController: AlertController) {
    this.menu = this.dataService.getData()
  }
  
  async presentAlertConfirm(platos: PlatoApp[], total: number) {
    var nombresDePlatosRecibidos: string = '';
    platos.forEach(plato => {
      nombresDePlatosRecibidos = nombresDePlatosRecibidos.concat(plato.plato).concat(', ');
    })
    nombresDePlatosRecibidos = nombresDePlatosRecibidos.concat('por ₡').concat(total.toString());

    if (total == 0) {
      const alert = await this.alertController.create({
        header: 'Agrega platos para continuar.',
        message: 'Incrementa la cantidad de cualquier plato para generar un pedido.',
        buttons: [
          {
            text: 'Entendido.',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: '¿Deseas realizar este pedido?',
        message: nombresDePlatosRecibidos,
        buttons: [
          {
            text: 'No, agregaré más platos.',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Obvio ¡Qué hambre!',
            handler: () => {
              this.router.navigateByUrl("/menu/tabs/tab3");
            }
          }
        ]
      });
      await alert.present();
    }
    
  }

  //Calculate Total
  calculateTotal() {
    var total = 0;
    var platos: PlatoApp[] = [];
    this.menu.forEach(element => {
      if (element.cant > 0) {
        total += (parseInt(element.precio) * parseInt(element.cant));
        platos.push(element);
      }
      
    });
    return { saldo: total, pedido: platos };
  }

  //Realizar compra
  comprar() {
    var pedido = this.calculateTotal();
    this.presentAlertConfirm(pedido.pedido, pedido.saldo);
    
    //this.dismiss();
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

  // // Dismiss Modal
  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }
}
