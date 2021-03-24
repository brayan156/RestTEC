import { Component, OnInit } from '@angular/core';
import {GestionDePlatosService} from '../../gestion-de-platos.service';
import {GestionMenuService} from '../../gestion-menu.service';

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css']
})
export class GestionMenuComponent implements OnInit {
  public contenido;
  constructor(private gestionMenu: GestionMenuService) { }

  ngOnInit(): void {
    this.gestionMenu.valoresActuales.subscribe(data => this.contenido = data);
  }
}
