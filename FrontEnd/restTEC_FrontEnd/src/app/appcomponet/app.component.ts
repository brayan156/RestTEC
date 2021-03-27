import { Component } from '@angular/core';
import {PedidosActivosService} from '../pedidos-activos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restTEC';

  /**
   * Constructor padre de todos los archivos presenetes en el trabaj
   * @param pedidosActivos servicio que nos ayuda a comunicar con el API, aca carga los JSON del api
   */
  constructor(private pedidosActivos: PedidosActivosService){
    pedidosActivos.cargarJson();
  }
}


