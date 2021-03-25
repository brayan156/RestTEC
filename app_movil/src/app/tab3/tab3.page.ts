import { Component, ViewChild } from '@angular/core';
import { AlertController, IonBadge, IonButton, ModalController } from '@ionic/angular';
import { proxyInputs } from '@ionic/angular/directives/proxies-utils';
import { FeedbackPage } from '../feedback/feedback.page';
import { Feedback } from '../objetos/feedback';
import { DataService } from '../services/data.service';
import { TrackingPage } from '../tracking/tracking.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cont = 0;
  pedidosEnProgreso = 0;
  disableButton = false;
  constructor(public modalController: ModalController, private dataService: DataService) {}

  @ViewChild(IonButton) calificacion: IonButton;
  pedidosMuestra = [
    {
      id: 1,
      menu: ['Lentejas con plátano maduro', 'Sopa azteca', 'Cereal con leche'],
      fecha: '3 de marzo',
      chef: 'Juan Carlos',
      estado: 'Preparando',
      tiempo_transcurrido: 1,
      tiempo_estimado: 5
    },
    {
      id: 2,
      menu: ['Sopa azteca'],
      fecha: '1 de marzo',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    },
    {
      id: 3,
      menu: ['Cereal con leche'],
      fecha: '28 de febrero',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    }
  ]

  setPedidosEnProgreso(len) {
    this.pedidosEnProgreso = len;
  }

  getPedidosEnProgreso() {
    var result = null;
    if (this.pedidosEnProgreso > 0) {
      result = this.pedidosEnProgreso;
    }
    return result;
  }

  feedback() {
    
  }

  async presentarFeedback(plato) {
    this.disableButton = true;
    console.log(this.pedidosMuestra);
    var tmp = [];
    this.pedidosMuestra.forEach(pedido => {
      console.log(pedido.id);
      console.log(plato.id);
      if (pedido.id === plato.id) { pedido.estado = 'Preparado'; tmp.push(pedido) }
      else { tmp.push(pedido)}
    })
    this.pedidosMuestra = tmp;
    console.log(this.pedidosMuestra);
    const modal = await this.modalController.create({
      component: FeedbackPage,
      componentProps: {
        platos: plato.menu
      }
    });
    ;
    return await modal.present();    
  }

  async mostrarPedidoEnProgreso() {
    var pedidoEnProgreso = this.dataService.getPedidoEnProgreso();
    if (pedidoEnProgreso != []) { this.setPedidosEnProgreso(pedidoEnProgreso.length) };
    const pedidoEnProgresoModal = await this.modalController.create({
      component: TrackingPage,
      componentProps: {
        pedido: pedidoEnProgreso
      }
    });
    return await pedidoEnProgresoModal.present();
    
  }

  doRefresh() {
    
  }




}
