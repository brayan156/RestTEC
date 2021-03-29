import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";

@Component({
  selector: 'app-gestion-del-menu',
  templateUrl: './gestion-del-menu.component.html',
  styleUrls: ['./gestion-del-menu.component.css']
})
export class GestionDelMenuComponent implements OnInit {
  /**
   * Constructor del componenete de la gestion menu
   */
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
      let pedidos_pedidos: Pedido[] =
        data.filter(ped => (ped.Cedula_chef_asignado === this.Cedula) && ped.Estado.split(",")[0] === "pedir");
      console.log(pedidos_pedidos);
      if (pedidos_pedidos.length !== 0) {
        console.log("hola");
        alert("hay pedido pedido por " + pedidos_pedidos[0].Estado.split(",")[1]);
      }
    });

  }

  Ver_platos_pedido(pedido: Pedido): void {
    this.pedidoActual = pedido;
    this.platos_con_nombre = this.pedidosActivosSistema.sacar_nombre_cantidad(pedido.Numero);
  }


  /**
   * Alrtas que se utilizaran en la creacion, elminacion o actualizacion de los platos
   */
  eliminarPlato(): void{
    alert('El plato ha sido eliminado del menu');
  }
  agredarPlato(): void{
    alert('El plato ha sido agregado al menu');
  }
  actualizarPlato(): void{
    alert('El plato ha sido actualizado con exito');
  }

}
