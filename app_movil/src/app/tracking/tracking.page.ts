import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  /**
   * Variable para mantener los pedidos en progreso
   */
  pedidosEnProgreso = [];

  @Input() pedido;

  /**
   * Constructor
   * @param modalController 
   * @param dataService 
   */
  constructor(public modalController: ModalController, private dataService: DataService) { }


  ngOnInit() {
  }

  /**
   * Desactiva la pestaña de pedido en progreso
   */
  dismiss() {
    this.modalController.dismiss();
  }

  /**
   * Actualiza los botones de Feedback para desactivarlos
   * @param evento 
   */
  refrescarPedido(evento) {
    setTimeout(() => {
      console.log(this.pedido);
    this.pedidosEnProgreso = this.dataService.getPedidoEnProgreso();
    var tmpList = []
    this.pedidosEnProgreso.forEach(pedido => {
      if (pedido.estado != 'Preparado') {
        tmpList.push(pedido);
      }
    });
    this.pedidosEnProgreso = tmpList;
    this.pedidosEnProgreso.shift();
    this.dataService.setPedidosEnProgreso(tmpList);
    evento.target.complete();
    }, 4000);
  }

}
