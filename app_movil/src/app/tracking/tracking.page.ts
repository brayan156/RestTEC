import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  pedidosEnProgreso = [];

  @Input() pedido;
  constructor(public modalController: ModalController) { this.pedidosEnProgreso = this.pedido}

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  refrescarPedido(evento) {
    console.log(this.pedido);
    this.pedidosEnProgreso = this.pedido;
  }

}
