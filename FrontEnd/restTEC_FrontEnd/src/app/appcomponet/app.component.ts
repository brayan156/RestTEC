import { Component } from '@angular/core';
import {PedidosActivosService} from '../pedidos-activos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restTEC';
  constructor(private pedidosActivos: PedidosActivosService){
    pedidosActivos.cargarJson();
  }
}


