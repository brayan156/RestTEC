import { Component } from '@angular/core';
import {PedidosActivosService} from '../pedidos-activos.service';
import {GestionDePlatosService} from '../gestion-de-platos.service';
import {GestionMenuService} from '../gestion-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restTEC';
  constructor(private pedidosActivos: PedidosActivosService, private gestionPedidos: GestionDePlatosService ,
              private gestionMenu: GestionMenuService){
    pedidosActivos.cargarJson();
    gestionMenu.cargarJson();
    gestionPedidos.cargarJson();
  }
}


