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
  public pedidoalerta=new Pedido;

  /**
   * Constructor del Control del pedido
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  /**
   * Inicialisa la vista control de pedido
   */
  ngOnInit(): void {
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidoActual = new Pedido;
    document.getElementById('myAlert').style.display="none";
    this.pedidoalerta.Estado = ",";
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.todos_pedidos = data;
      this.sin_pedidos = data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado === "Cocinando");
      let pedidos_pedidos:Pedido[] = data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado.split(",")[0] === "pedir");
      console.log(pedidos_pedidos);
      if (pedidos_pedidos.length !== 0) {
        this.pedidoalerta = pedidos_pedidos[0];
        document.getElementById('myAlert').style.display = "initial";
        console.log("hola");
      }
    });

  }

  /**
   * Funcion para ver platos dentro del tipo de pedido
   * @param pedido el pedido
   * @constructor
   */
  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

  /**
   * Funcion el la cual el chef indica que el pedido se ha terminado y esta listo para ser entregado
   */
  terminarPedido() {
    this.pedidoActual.Estado ="Preparado"
    this.pedidosActivosSistema.editarpedido(this.pedidoActual).subscribe(r => {

      if (r === "registro editado exitosamente") { this.terminaPlato(); }
      this.ngOnInit();
    });
  }

  /**
   * Funcion con la cual un chef puede rechazar un pedido
   */
  rechazarpedido() {
    this.pedidoalerta.Cedula_chef_asignado = this.Cedula;
    this.pedidoalerta.Estado = "Cocinando"
    this.pedidosActivosSistema.editarpedido(this.pedidoalerta).subscribe(r => {

      if (r === "registro editado exitosamente") { alert("Solicitud rechazada"); }
      this.ngOnInit();
    });
  }

  /**
   * Funcion con la cual se puede reasignar algun pedido
   */
  reasignarpedido() {
    this.pedidoalerta.Cedula_chef_asignado = this.pedidoalerta.Estado.split(",")[1] as unknown as number;
    this.pedidoalerta.Estado = "Cocinando"
    this.pedidosActivosSistema.editarpedido(this.pedidoalerta).subscribe(r => {

      if (r === "registro editado exitosamente") { alert("el pedido ha sido reasignado"); }
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
