import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../form-usuario/Comunicacion/pedido';
import {PedidosActivosService} from '../../pedidos-activos.service';

@Component({
  selector: 'app-pedidos-en-el-sistema',
  templateUrl: './pedidos-en-el-sistema.component.html',
  styleUrls: ['./pedidos-en-el-sistema.component.css']
})
export class PedidosEnElSistemaComponent implements OnInit {

  public platos_con_nombre;
  public todos_pedidos;
  public sin_pedidos;
  public pedidoActual;
  public Cedula;

  /**
   * Contructor de la para ver los pedidos dentro del sistema
   * @param pedidosActivosSistema
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  /**
   * Inicializa todas las variables necesarias dentro del componente de pedidos del sistema para el chef
   */
  ngOnInit(): void {
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidoActual = new Pedido;
    this.pedidosActivosSistema.obtenerPedidos().subscribe(data => {
      this.todos_pedidos = data;
      this.sin_pedidos = data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado === "Cocinando");
      let pedidos_pedidos: Pedido[] =
        data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado.split(",")[0] === "pedir");
      console.log(pedidos_pedidos);
      if (pedidos_pedidos.length !== 0) {
        console.log("hola");
        alert("hay pedido pedido por " + pedidos_pedidos[0].Estado.split(",")[1]);
      }
    });

  }

  /**
   * Se cambia los valores de los pedidos
   * @param pedido nuevo valor del pedido
   * @constructor
   */
  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }

}
