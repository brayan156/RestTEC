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
  @Input() platos;
  @Input() factura;

  constructor(public modalController: ModalController,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
    this.router.navigateByUrl("/menu/tabs/tab3");
    this.dataService.nuevoPedido(this.platos, this.factura.Monto);
    console.log(this.factura);
  }
}
