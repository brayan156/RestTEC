import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
  

export class FeedbackPage {

    /**
   * Feedback page consiste en un modal que muestra 
   * un boton y un ion-range para calificar el pedido.
   */

  /**
   * Desde su componenente padre (tab Pedidos) recibe
   * los platos que debe desplegar en el feedback.
   */
  @Input() platos;


  @ViewChild(IonRange) calificacion: IonRange;

  /**
   * Constructor, inyectamos los controladores necesarios
   * @param modalController 
   */  
  constructor(public modalController: ModalController) { }

  /**
   * Cierra el modal
   */
  dismiss() {
    this.modalController.dismiss();
    console.log(this.calificacion.value);
  }
  

}
