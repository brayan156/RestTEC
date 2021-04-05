import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";

@Component({
  selector: 'app-reasignacion-de-pedidos',
  templateUrl: './reasignacion-de-pedidos.component.html',
  styleUrls: ['./reasignacion-de-pedidos.component.css']
})
export class ReasignacionDePedidosComponent implements OnInit {
  public platos_con_nombre;
  public todos_pedidos;
  public sin_pedidos;
  public pedidoActual;
  public Cedula;
  /**
   * Constructor para la el componente
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  /**
   * Inicializa la reasignacion de pedidos
   */
  ngOnInit(): void {
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidoActual = new Pedido;
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.todos_pedidos = data;
      this.sin_pedidos = data.filter(ped => (ped.Cedula_chef_asignado !== this.Cedula && ped.Estado==="Cocinando"));
    });

  }

  /**
   * Funcin para navegar en los pedidos
   * @param pedido valor de pedido
   * @constructor
   */
  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

  /**
   * Funcio par recivir el pedido
   */
  pedirPedido() {
    this.pedidoActual.Estado = "pedir,"+this.Cedula;
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.reasignarPlato(); }
      this.ngOnInit();
    });
  }

  /**
   * Alertas para la reasignacion de pedidos
   */
  reasignarPlato(): void{
    alert('El pedido ha sido  solicitado');
  }


}
