import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  pedidosEnProgreso = [];

  @Input() pedido;
  constructor(public modalController: ModalController, private dataService: DataService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }


  refrescarPedido(evento) {
    console.log(this.pedido);
    this.pedidosEnProgreso = this.dataService.getPedidoEnProgreso();
    var tmpList = []
    this.pedidosEnProgreso.forEach(pedido => {
      if (pedido.estado != 'Preparado') {
        tmpList.push(pedido);
      }
    });
    this.pedidosEnProgreso = tmpList;
    this.dataService.setPedidosEnProgreso(tmpList);
  }

}
