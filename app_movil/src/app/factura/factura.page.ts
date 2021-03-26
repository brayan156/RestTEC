import { Component, Input, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PlatosEnMenu } from '../objetos/platos-en-menu';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
    /**
   * Factura page consiste en un modal que muestra 
   * los platos y el total del pedido
   */

  /**
   * Desde su componenente padre (tab Carrito) recibe
   * los platos que debe desplegar en la factura.
   */
  @Input() platos;
  @Input() factura;

  /**
   * Constructor inyectado
   * @param modalController
   * @param router 
   * @param dataService 
   */
  constructor(public modalController: ModalController,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
  }

  /**
   * Cierra la factura y lo redirige a la tab de pedidos
   */
  dismiss() {
    this.modalController.dismiss();
    this.router.navigateByUrl("/menu/tabs/tab3");
    this.dataService.nuevoPedido(this.platos, this.factura.Monto);
    console.log(this.factura);
  }
}
