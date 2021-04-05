import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";

@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css']
})
export class VistaAdministradorComponent implements OnInit {

  constructor(private pedidosActivosSistema: PedidosActivosService) {
    clearInterval(this.pedidosActivosSistema.IntervalID);
    this.pedidosActivosSistema.Iactivo = false;}

  ngOnInit(): void {
  }

}
