import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginComunication} from '../Comunicacion/LoginComunication';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  manejoLogin: LoginComunication = new LoginComunication('', '' , '');

  constructor(
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }
  goTo(): void{
    if (this.manejoLogin.tipo === 'admi') {
      this.router.navigate([ '/administrador']); }
    else if (this.manejoLogin.tipo === 'chef'){
      this.router.navigate([ '/chef']); }
  }
}
