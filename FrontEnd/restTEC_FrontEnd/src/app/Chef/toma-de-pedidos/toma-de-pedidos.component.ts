import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toma-de-pedidos',
  templateUrl: './toma-de-pedidos.component.html',
  styleUrls: ['./toma-de-pedidos.component.css']
})
export class TomaDePedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  aceptarPlato(): void{
    alert('El plato ha sido aceptado');
  }
  rechazarPlato(): void{
    alert('El plato ha sido rexchzado');
  }


}
