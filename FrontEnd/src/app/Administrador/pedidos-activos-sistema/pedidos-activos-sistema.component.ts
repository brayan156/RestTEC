import { Component, OnInit } from '@angular/core';
import {PedidosActivosService} from '../../pedidos-activos.service';

@Component({
  selector: 'app-pedidos-activos-sistema',
  templateUrl: './pedidos-activos-sistema.component.html',
  styleUrls: ['./pedidos-activos-sistema.component.css']
})
export class PedidosActivosSistemaComponent implements OnInit {
  public contenido;
   constructor(private pedidosActivosSistema: PedidosActivosService) { }

  ngOnInit(): void {
    this.pedidosActivosSistema.valoresActuales.subscribe(data => this.contenido = data);
  }

}
