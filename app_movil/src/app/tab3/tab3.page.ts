import { Component, ViewChild } from '@angular/core';
import { AlertController, IonButton, ModalController } from '@ionic/angular';
import { proxyInputs } from '@ionic/angular/directives/proxies-utils';
import { FeedbackPage } from '../feedback/feedback.page';
import { Feedback } from '../objetos/feedback';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public modalController: ModalController) {}

  @ViewChild(IonButton) calificacion: IonButton;
  pedidosMuestra = [
    {
      menu: ['Lentejas con plátano maduro', 'Sopa azteca', 'Cereal con leche'],
      fecha: '3 de marzo',
      chef: 'Juan Carlos',
      estado: 'Preparando',
      tiempo_transcurrido: '1min',
      tiempo_estimado: '5min'
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



}
