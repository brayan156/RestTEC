import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { WebElementPromise } from 'selenium-webdriver';
import { FacturaPage } from '../factura/factura.page';
import { Factura } from '../objetos/factura';
import { Pedido } from '../objetos/pedido';
import { PlatoApp } from '../objetos/plato-app';
import { DataService } from '../services/data.service';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  // Data passed in by componentProps
  @Input() menu: any;


  /**
   * Constructor
   * @param dataService 
   * @param router 
   * @param alertController 
   * @param objetos 
   * @param modalController 
   */
  constructor(private dataService: DataService,
    private router: Router,
    public alertController: AlertController,
    private objetos: ObjetosService,
    public modalController: ModalController) {

    this.menu = this.objetos.getplatos_menu();
    console.log(this.objetos.carrito.Id);
    console.log(this.objetos.carrito.N_compra);
  }

  /**
   * Despliega un modal para ver la factura
   * @param factura 
   * @param platos 
   * @returns 
   */
  async mostrarFactura(factura: Factura, platos: PlatoApp[]) {
    const facturaModal = await this.modalController.create({
      component: FacturaPage,
      componentProps: {
        factura: factura,
        platos: platos

      }
    });
    return await facturaModal.present();

  }


  /**
   * Despliega una alerta de confirmacion para corroborar que el cliente quiera 
   * continuar con la compra
   * @param platos 
   * @param total 
   */
  async presentAlertConfirm(platos: PlatoApp[], total: number) {
    // var nombresDePlatosRecibidos: string = '';
    // platos.forEach(plato => {
    //   nombresDePlatosRecibidos = nombresDePlatosRecibidos.concat(plato.plato).concat(', ');
    // })

    // nombresDePlatosRecibidos = nombresDePlatosRecibidos.concat('por ₡').concat(total.toString());
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
        header: '¿Deseas continuar con este pedido?',
        message: '',
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
              let factura = this.dataService.comprar(platos, total);
              console.log(factura);
              this.presentFinalAlert(factura.detalle, platos);
            }
          }
        ]
      });
      await alert.present();
    }

  }

  /**
   * Segunda alerta de confirmacion
   * @param factura 
   * @param platos 
   */
  async presentFinalAlert(factura: Factura, platos: PlatoApp[]) {
    const alert = await this.alertController.create({
      header: 'Compra realizada ¡Veamos la factura!',
      message: '',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.mostrarFactura(factura, platos);
          }
        }
      ]
    });
    await alert.present();
  }



  /**
   * Calcula el total de la factura
   * @returns 
   */
  calculateTotal() {
    var total = 0;
    var platos: PlatoApp[] = [];
    var cont = 0;
    this.menu.forEach(element => {
      if (element.cant > 0) {
        total += (parseInt(element.precio) * parseInt(element.cant));
        platos.push(element);
      }
      cont += 1;
    });
    return { saldo: total, pedido: platos };
  }

  /**
   * Realiza la compra
   */
  comprar() {
    var pedido = this.calculateTotal();
    this.presentAlertConfirm(pedido.pedido, pedido.saldo);

    //this.dismiss();
  }


  /**
   * Actualiza el valor de la cantidad de un plato
   * @param valor 
   * @param plato 
   */
  cambioValor(valor, plato) {
    plato.cant = parseInt(valor);
  }

  /**
   * Funcion para refrescar el ion refresher
   * @param event 
   */
  doRefresh(event) {
    
    setTimeout(() => {
      this.menu = this.objetos.getplatos_menu();
      event.target.complete();
    }, 1000);
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
