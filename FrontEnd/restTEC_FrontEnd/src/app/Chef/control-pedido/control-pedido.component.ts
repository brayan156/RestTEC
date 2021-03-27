import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-pedido',
  templateUrl: './control-pedido.component.html',
  styleUrls: ['./control-pedido.component.css']
})
export class ControlPedidoComponent implements OnInit {

  /**
   * Constructor del Control del pedido
   */
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Aleta utilizada para la visualisacion de finalizacion del pedido
   */
  terminaPlato(): void{
    alert('El plato ha sido terminado y esta listo para recoger');
  }
}
