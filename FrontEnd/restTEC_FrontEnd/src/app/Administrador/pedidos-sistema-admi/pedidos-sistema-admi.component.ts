import { Component, OnInit } from '@angular/core';

import {PedidosActivosService} from "../../pedidos-activos.service";
import { CarritoGenera } from "../../form-usuario/Comunicacion/carrito-genera";

@Component({
  selector: 'app-pedidos-sistema-admi',
  templateUrl: './pedidos-sistema-admi.component.html',
  styleUrls: ['./pedidos-sistema-admi.component.css']
})
export class PedidosSistemaAdmiComponent implements OnInit {
  public contenido;
  public platos_con_nombre;

  constructor(private pedidosActivosSistema: PedidosActivosService) {


  }

  Ver_platos_pedido(Numero: number): void {
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(Numero);
  }

  ngOnInit(): void {
    this.pedidosActivosSistema.valoresActuales.subscribe(data => this.contenido = data);

  }
}
