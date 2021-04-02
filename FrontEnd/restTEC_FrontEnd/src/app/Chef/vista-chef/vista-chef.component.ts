import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";

@Component({
  selector: 'app-vista-chef',
  templateUrl: './vista-chef.component.html',
  styleUrls: ['./vista-chef.component.css']
})
export class VistaChefComponent implements OnInit {


  /**
   * Constructor del Control del pedido
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  ngOnInit(): void {
  }
}
