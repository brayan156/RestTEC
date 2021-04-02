import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PedidosActivosService } from "../../pedidos-activos.service";

@Component({
  selector: 'app-navbar-chef',
  templateUrl: './navbar-chef.component.html',
  styleUrls: ['./navbar-chef.component.css']
})
export class NavbarChefComponent implements OnInit {
  public Cedula;

  /**
   * Contructor del componenete Navbar Administrador
   * @param route clase que con la cual nos ayuda implementar la funcion navegation
   * */
  constructor(private route: Router, private pedidosActivosSistema: PedidosActivosService) {
    this.Cedula = this.pedidosActivosSistema.cedula;
  }
  ngOnInit(): void {
  }

  /**
   * Funcion de navegacion con la cual arreglamos problemas de ruteo en la navbar
   * @param route clase que con la cual nos ayuda implementar la funcion navegation
   */

  // tslint:disable-next-line:typedef
  navegation(route){
    this.route.navigateByUrl('/chef/'.concat(route));
  }
}
