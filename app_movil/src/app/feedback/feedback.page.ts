import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';
import { Feedback } from "../objetos/feedback";
import { ObjetosService } from "../services/objetos.service";

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
  constructor(public modalController: ModalController, private objetos: ObjetosService) { }

  /**
   * Cierra el modal
   */
  dismiss() {
    var feedback: Feedback = new Feedback;

    feedback.Id_pedido = this.platos.pedido.Numero;
    console.log(feedback.Id_pedido);
    feedback.Calificacion = this.calificacion.value as number;
    this.platos.pedido.Estado = "Finalizado";
    this.objetos.dar_feedback(feedback);
    this.objetos.pedido_recibido(this.platos.pedido);
    this.modalController.dismiss();


  }
  

}
