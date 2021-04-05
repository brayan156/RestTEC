import { Component, OnInit } from '@angular/core';
import { CarritoAlmacena } from "../../form-usuario/Comunicacion/carrito-almacena";
import { Plato } from "../../form-usuario/Comunicacion/plato";
import { PedidosActivosService } from "../../pedidos-activos.service";

@Component({
  selector: 'app-top10mas-ganancias',
  templateUrl: './top10mas-ganancias.component.html',
  styleUrls: ['./top10mas-ganancias.component.css']
})
export class Top10masGananciasComponent implements OnInit {

  public Platos: Plato[] = [];
  public Ganancias = [];
  /**
   * Constructor para la visualizacion de los platos mas vendidos
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  /**
   * Inicializa las variables necesarias para la pantalla de top 10 platos con mas ganancias
   */
  ngOnInit(): void {

      this.pedidosActivosSistema.getPlatos().subscribe(platos => {
        this.Platos = platos;
        this.obtenerPlatosGanancias();

      });
  }

  /**
   * Obtiene los platos con mas ganacias para mostrar en el HTML
   */
  public obtenerPlatosGanancias() {
    let Ganancias = [];
    var platossorted = this.Platos.sort((b, a) => a.Ganancia - b.Ganancia);
    if (platossorted.length > 10) platossorted=platossorted.slice(0, 10);
    platossorted.forEach(plato => {
      Ganancias.push({ Nombre: plato.Nombre, Ganancia: plato.Ganancia });
    });
    this.Ganancias = Ganancias;
  }

  /**
   * Funcion que es llamada por el boton para generar un reporte de la tabla de los plastos con mas ganacias
   * esto se realiza con crystal reports
   */
  public generarpdf(): void {
    this.pedidosActivosSistema.GetGanancias(this.Ganancias).subscribe(res => {
      var newBlob = new Blob([res], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "Top10Ganancias.pdf";
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    });
  }

}
