import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Carrito } from "../../form-usuario/Comunicacion/carrito";
import { Cliente } from "../../form-usuario/Comunicacion/cliente";
import { Feedback } from "../../form-usuario/Comunicacion/feedback";
import { Factura } from "../../form-usuario/Comunicacion/factura";
import { CarritoGenera } from "../../form-usuario/Comunicacion/carrito-genera";
import { CarritoAlmacena } from "../../form-usuario/Comunicacion/carrito-almacena";
import { Plato } from "../../form-usuario/Comunicacion/plato";

@Component({
  selector: 'app-top10-feedback',
  templateUrl: './top10-feedback.component.html',
  styleUrls: ['./top10-feedback.component.css']
})
export class Top10FeedbackComponent implements OnInit {
  public feedbacks: Feedback[] = [];
  public CarritoGeneras: CarritoGenera[] = [];
  public Carritos: Carrito[] = [];
  public Carritoalmacenas: CarritoAlmacena[] = [];
  public Platos: Plato[] = [];

  public PlatosFeedback = [];

  /**
   * Constructor para la visualizacion de los platos mas vendidos
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  /**
   * Inicialisa todas las variables necesarias para la pantalla de de TOP Fedback
   */
  ngOnInit(): void {

    this.pedidosActivosSistema.getFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.pedidosActivosSistema.getCarritoGenera().subscribe(carritosgeneras => {
        this.CarritoGeneras = carritosgeneras;
        this.pedidosActivosSistema.getCarritos_almacena().subscribe(carritos_almacenas => {
          this.Carritoalmacenas = carritos_almacenas;
          this.pedidosActivosSistema.getPlatos().subscribe(platos => {
            this.Platos = platos;
            this.obtenerMejoresFeedback();
          });
        });
      });
    });
  }

  /**
   * Funcion para obtener los mejores platos segun el fedback de los pedidos
   */
  public obtenerMejoresFeedback() {
    let Plato_puntuacion = [];
    this.feedbacks.forEach(feedback => {
      let Platos: Plato[] = this.Obtenerplatos_feedback(feedback.Id_pedido);
      Platos.forEach(plato => {
        if (Plato_puntuacion.some(p => p.Nombre === plato.Nombre)) {
          let pp = Plato_puntuacion.find(p => p.Nombre === plato.Nombre);
          pp.Cantidad += 1;
          pp.puntuacion += feedback.Calificacion;
          Plato_puntuacion = Plato_puntuacion.filter(p => p.Nombre !== plato.Nombre);
          Plato_puntuacion.push(pp);
        } else {
          Plato_puntuacion.push({ Nombre: plato.Nombre, Cantidad: 1, puntuacion: feedback.Calificacion });
        }
      });
    });
    var plato_promedio = [];
    Plato_puntuacion.forEach(plato => {
      plato_promedio.push({ Nombre: plato.Nombre, Promedio: (plato.puntuacion / plato.Cantidad) });
    });
    var platossorted = plato_promedio.sort((b, a) => a.Promedio - b.Promedio);
    if (platossorted.length > 10) platossorted = platossorted.slice(0, 10);
    this.PlatosFeedback = platossorted;
  }

  /**
   * Obtiene lo platos para calcular su feddback
   * @param id_pedido ID DEL PEDIDO
   * @constructor
   */
  public Obtenerplatos_feedback(id_pedido) {
    let carritogenera: CarritoGenera = this.CarritoGeneras.find(carritognera => carritognera.Id_pedido === id_pedido);
    console.log(this.CarritoGeneras);
    console.log(carritogenera);
    let almacen: CarritoAlmacena[] = this.Carritoalmacenas.filter(
      almacen => almacen.Id_carrito === carritogenera.Id_carrito && almacen.N_compra === carritogenera.N_compra);
    return this.Platos.filter(plato => almacen.some(dato => dato.N_plato === plato.Numero_plato));
  }

  /**
   * Llama a la funvion para generar el reporte con crystalReports
   */
  public generarpdf(): void {
    this.pedidosActivosSistema.GetPromedio(this.PlatosFeedback).subscribe(res => {
      var newBlob = new Blob([res], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "TopMejorPuntuados.pdf";

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function() {
          window.URL.revokeObjectURL(data);
        },
        100);
    });
  }
}
