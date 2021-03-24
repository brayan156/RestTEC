import { Component, OnInit } from '@angular/core';
import {PedidosActivosService} from '../../pedidos-activos.service';
import {GestionDePlatosService} from '../../gestion-de-platos.service';

@Component({
  selector: 'app-gestion-tipo-plato',
  templateUrl: './gestion-tipo-plato.component.html',
  styleUrls: ['./gestion-tipo-plato.component.css']
})
export class GestionTipoPlatoComponent implements OnInit {
  public contenido;
  constructor(private gestionPlatos: GestionDePlatosService) { }

  ngOnInit(): void {
    this.gestionPlatos.valoresActuales.subscribe(data => this.contenido = data);
  }
}
