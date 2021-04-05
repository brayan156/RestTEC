import { Component, OnInit } from '@angular/core';

import {PedidosActivosService} from "../../pedidos-activos.service";
import { CarritoGenera } from "../../form-usuario/Comunicacion/carrito-genera";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";

@Component({
  selector: 'app-pedidos-sistema-admi',
  templateUrl: './pedidos-sistema-admi.component.html',
  styleUrls: ['./pedidos-sistema-admi.component.css']
})
export class PedidosSistemaAdmiComponent implements OnInit {
  public contenido;
  public platos_con_nombre;
  public pedidoActual:Pedido=new Pedido;
  /**
   * Creacion del componente de pedidos en el sistema
   * @param pedidosActivosSistema servivio que nos ayuda a comunicar la apliacion web y el API
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {


  }

  /**
   *
   * @param Numero
   * @constructor
   */
  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

  ngOnInit(): void {
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.contenido = data.filter(ped => (ped.Estado!=="Finalizado"));
    });

  }
}
