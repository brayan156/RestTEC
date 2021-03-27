import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toma-de-pedidos',
  templateUrl: './toma-de-pedidos.component.html',
  styleUrls: ['./toma-de-pedidos.component.css']
})
export class TomaDePedidosComponent implements OnInit {
  /**
   * Construcotor para la creacion de componente
   */
  constructor() { }

  ngOnInit(): void {
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
