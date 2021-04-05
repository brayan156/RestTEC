import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { CarritoAlmacena } from "../../form-usuario/Comunicacion/carrito-almacena";
import { Plato } from "../../form-usuario/Comunicacion/plato";

@Component({
  selector: 'app-top10-mas-vendidos',
  templateUrl: './top10-mas-vendidos.component.html',
  styleUrls: ['./top10-mas-vendidos.component.css']
})
export class Top10MasVendidosComponent implements OnInit {



  public Platos:Plato[]=[];
  public Vendidos=[];
  /**
   * Constructor para la visualizacion de los platos mas vendidos
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  ngOnInit(): void {

    this.pedidosActivosSistema.getPlatos().subscribe(platos => {
      this.Platos = platos;
      this.obtenerPlatosVendidos();

    });
  }

  public obtenerPlatosVendidos() {
    let Ventas = [];
    var platossorted = this.Platos.sort((b, a) => a.Ventas - b.Ventas);
    if (platossorted.length > 10) platossorted = platossorted.slice(0, 10);
    platossorted.forEach(plato => {
      Ventas.push({ Nombre: plato.Nombre, Cantidad: plato.Ventas });
    });
    this.Vendidos = Ventas;
  }

  public generarpdf(): void {
    this.pedidosActivosSistema.GetVentas(this.Vendidos).subscribe(res => {
      var newBlob = new Blob([res], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "TopVentas.pdf";

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    });
  }

}
