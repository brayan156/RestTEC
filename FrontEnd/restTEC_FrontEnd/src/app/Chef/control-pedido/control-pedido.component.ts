import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";

@Component({
  selector: 'app-control-pedido',
  templateUrl: './control-pedido.component.html',
  styleUrls: ['./control-pedido.component.css']
})
export class ControlPedidoComponent implements OnInit {
  public platos_con_nombre;
  public todos_pedidos;
  public sin_pedidos;
  public pedidoActual;
  public Cedula;


  /**
   * Constructor del Control del pedido
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  ngOnInit(): void {
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidoActual = new Pedido;
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.todos_pedidos = data;
      this.sin_pedidos = data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado === "Cocinando");
      let pedidos_pedidos:Pedido[] = data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado.split(",")[0] === "pedir");
      console.log(pedidos_pedidos);
      if (pedidos_pedidos.length !== 0) {
        const myAlert = document.getElementById('myAlert');
        console.log("hola");
        this.pedidoActual = pedidos_pedidos[0];
        alert("hay pedido pedido por "+ pedidos_pedidos[0].Estado.split(",")[1]);
      }
    });

  }

  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

  terminarPedido() {
    this.pedidoActual.Estado ="Preparado"
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.terminaPlato(); }
      this.ngOnInit();
    });
  }

  rechazarpedido() {
    this.pedidoActual.Cedula_chef_asignado = this.Cedula;
    this.pedidoActual.Estado = "Cocinando"
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.terminaPlato(); }
      this.ngOnInit();
    });
  }

  reasignarpedido() {
    this.pedidoActual.Cedula_chef_asignado = this.pedidoActual.Estado.split(",")[1] as number;
    this.pedidoActual.Estado = "Cocinando"
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.terminaPlato(); }
      this.ngOnInit();
    });
  }



    /**
     * Aleta utilizada para la visualisacion de finalizacion del pedido
     */
  terminaPlato(): void{
     alert('El plato ha sido terminado y esta listo para recoger');
  }
}
