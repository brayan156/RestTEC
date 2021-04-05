import { Component, OnInit } from '@angular/core';
import { Plato } from "../../form-usuario/Comunicacion/plato";
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Carrito } from "../../form-usuario/Comunicacion/carrito";
import { Cliente } from "../../form-usuario/Comunicacion/cliente";

@Component({
  selector: 'app-top10mejores-clientes',
  templateUrl: './top10mejores-clientes.component.html',
  styleUrls: ['./top10mejores-clientes.component.css']
})
export class Top10mejoresClientesComponent implements OnInit {

  public Carritos: Carrito[] = [];
  public clientes: Cliente[]=[];
  public Ordenes = [];

  /**
   * Constructor para la visualizacion de los platos mas vendidos
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  ngOnInit(): void {

    this.pedidosActivosSistema.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.pedidosActivosSistema.getCarritos().subscribe(carritos => {
        this.Carritos=carritos;
        this.obtenerClientesCompras();
      });


    });
  }

  public obtenerClientesCompras() {
    let Ordenes = [];
    this.clientes.forEach(cliente => {
      let cantidadOrdenes:number = this.Carritos.filter(carrito => cliente.Cedula === carrito.Id_cliente).length-1;
      Ordenes.push({ Nombre: (cliente.Primer_Nombre as string+" "+cliente.Apellido+" ("+cliente.Cedula.toString()+")"), Ordenes: cantidadOrdenes });
    });
    var ordenessorted = Ordenes.sort((b, a) => a.Ordenes - b.Ordenes);
    if (ordenessorted.length > 10) ordenessorted = ordenessorted.slice(0, 10);
    this.Ordenes = ordenessorted;
  }

  public generarpdf(): void {
    this.pedidosActivosSistema.GetOrdenes(this.Ordenes).subscribe(res => {
      var newBlob = new Blob([res], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "TopOrdenes.pdf";

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function() {
          window.URL.revokeObjectURL(data);
        },
        100);
    });
  }
}
