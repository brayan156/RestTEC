import { Component, OnInit } from '@angular/core';

import {PedidosActivosService} from "../../pedidos-activos.service";

@Component({
  selector: 'app-pedidos-sistema-admi',
  templateUrl: './pedidos-sistema-admi.component.html',
  styleUrls: ['./pedidos-sistema-admi.component.css']
})
export class PedidosSistemaAdmiComponent implements OnInit {
  public contenido;

  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  ngOnInit(): void {
    this.pedidosActivosSistema.valoresActuales.subscribe(data => this.contenido = data);
  }
}
