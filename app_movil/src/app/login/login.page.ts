import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../objetos/menu';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  router:  Router, private objetos: ObjetosService) { }

  ngOnInit() {
  }

  login(form) {
    this.router.navigateByUrl('/menu/tabs/tab1');
    this.objetos.ingresarmenu(this.objetos.getplatos_menu());
  }

}
