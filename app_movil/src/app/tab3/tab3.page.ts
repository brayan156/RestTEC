import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonBadge, IonButton, ModalController } from '@ionic/angular';
import { proxyInputs } from '@ionic/angular/directives/proxies-utils';
import { FeedbackPage } from '../feedback/feedback.page';
import { Feedback } from '../objetos/feedback';
import { DataService } from '../services/data.service';
import { TrackingPage } from '../tracking/tracking.page';
import { ObjetosService } from "../services/objetos.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  cont = 0;
  pedidosEnProgreso = 0;
  disableButton = false;

  /**
   * Constructor
   * @param modalController 
   * @param dataService 
   */
  constructor(public modalController: ModalController,
    private dataService: DataService,
    private objetos: ObjetosService) {
    this.pedidosMuestra = this.objetos.obtener_pedidos();
    console.log(this.pedidosMuestra);
  }

  @ViewChild(IonButton) calificacion: IonButton;

  /**
   * Un Objeto para desplegar pedidos viejos
   */
  pedidosMuestra = [];
    /*{
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
  ]*/



  /**
   * Incrementa la cantidad de pedidos en progreso.
   * Esta variable es la que se despliega en el badge.
   * @param len 
   */
  setPedidosEnProgreso(len) {
    this.pedidosEnProgreso = len;
  }

  /**
   * Retorna el contador de pedidos en progreso.
   * @returns 
   */
  getPedidosEnProgreso() {
    var result = null;
    if (this.pedidosEnProgreso > 0) {
      result = this.pedidosEnProgreso;
    }
    return result;
  }

  feedback() {
    
  }

  /**
   * Presenta el modal del feedback
   * @param plato 
   * @returns 
   */
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
        platos: plato
      }
    });
    ;
    return await modal.present();    
  }

  /**
   * Depsliega el modal para pedido en progreso.
   * @returns 
   */
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

  doRefresh(evento) {
    setTimeout(() => {
      this.pedidosMuestra = this.objetos.obtener_pedidos();
      evento.target.complete();
    }, 1000)
  }

  ngOnInit() {


  }


}
