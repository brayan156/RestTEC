import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";

@Component({
  selector: 'app-toma-de-pedidos',
  templateUrl: './toma-de-pedidos.component.html',
  styleUrls: ['./toma-de-pedidos.component.css']
})
export class TomaDePedidosComponent implements OnInit {
  public platos_con_nombre;
  public todos_pedidos;
  public sin_pedidos;
  public pedidoActual;
  public Cedula;
  /**
   * Construcotor para la creacion de componente
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  ngOnInit(): void {
    this.pedidoActual = new Pedido;
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.todos_pedidos = data;
      this.sin_pedidos = data.filter(ped => (ped.Estado.toString() === "sin asignar"));
    });

  }

  /**
   * Funcion para navegar entre los pedidos pedido
   * @param pedido pedido que deso navegar
   * @constructor
   */
  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual =  pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

  /**
   * Funcion para que el chef acepte un pedido
   */
  aceptarPedido() {
    this.pedidoActual.Cedula_chef_asignado = this.Cedula;
    this.pedidoActual.Estado="Cocinando"
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.aceptarPlato(); }
      this.ngOnInit();
    });
  }
  /**
   * Alertas para aceptar y rechazar platos
   */
  aceptarPlato(): void{
    alert('El plato ha sido aceptado');
  }
  rechazarPlato(): void{
    alert('El plato ha sido rexchzado');
  }


}
