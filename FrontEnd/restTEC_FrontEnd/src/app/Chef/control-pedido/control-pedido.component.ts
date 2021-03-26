import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-pedido',
  templateUrl: './control-pedido.component.html',
  styleUrls: ['./control-pedido.component.css']
})
export class ControlPedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  terminaPlato(): void{
    alert('El plato ha sido terminado y esta listo para recoger');
  }
}
