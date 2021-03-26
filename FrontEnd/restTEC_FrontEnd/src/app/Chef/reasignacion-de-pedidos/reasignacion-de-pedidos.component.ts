import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reasignacion-de-pedidos',
  templateUrl: './reasignacion-de-pedidos.component.html',
  styleUrls: ['./reasignacion-de-pedidos.component.css']
})
export class ReasignacionDePedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  reasignarPlato(): void{
    alert('El plato ha sido ha reasigando');
  }
  aceptarPlato(): void{
    alert('El plato ha sido aceptado');
  }

}
