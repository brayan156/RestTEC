import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";

@Component({
  selector: 'app-top10-feedback',
  templateUrl: './top10-feedback.component.html',
  styleUrls: ['./top10-feedback.component.css']
})
export class Top10FeedbackComponent implements OnInit {
  /**
   * Constructor para la visualizacion de los platos con mejor feedback
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  ngOnInit(): void {

  }

}
