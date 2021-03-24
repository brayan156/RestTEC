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
  pedidosEnProgreso = 0;
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
      menu: ['Sopa azteca'],
      fecha: '1 de marzo',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    },
    {
      menu: ['Cereal con leche'],
      fecha: '28 de febrero',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    }
  ]

  setPedidosEnProgreso() {
    this.pedidosEnProgreso += 1;
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

  async presentarFeedback(pedido) {
    const modal = await this.modalController.create({
      component: FeedbackPage,
      componentProps: {
        platos: pedido
      }
    });
    return await modal.present();
    
  }

  async mostrarPedidoEnProgreso() {
    var pedidoEnProgreso = this.dataService.getPedidoEnProgreso();
    if (pedidoEnProgreso != {}) { this.setPedidosEnProgreso() };
    const modal = await this.modalController.create({
      component: TrackingPage,
      componentProps: {
        pedido: pedidoEnProgreso
      }
    });
    return await modal.present();
    
  }



}
