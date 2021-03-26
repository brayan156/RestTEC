import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css']
})
export class NavbarAdministradorComponent implements OnInit {

  constructor(private route: Router){
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  navegation(route){
    this.route.navigateByUrl('/administrador/'.concat(route));
  }
}


