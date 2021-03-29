import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { LoginComunication } from "./Comunicacion/LoginComunication";
import { PedidosActivosService } from "../pedidos-activos.service";

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  manejoLogin: LoginComunication = new LoginComunication('', '' , '');
  Url = 'https://192.168.1.3:45455/';
  constructor(
    private router: Router, private http: HttpClient, private pedidosActivosSistema: PedidosActivosService) {
  }
  ngOnInit(): void {
  }
  goTo(): void {
    this.http.get<LoginComunication>(this.Url + "Usuario/validar_Usuario/" + this.manejoLogin.Email + "/" + this.manejoLogin.Password).subscribe(
      usuario => {
        this.manejoLogin.Cedula = usuario.Cedula;
        this.pedidosActivosSistema.cedula = usuario.Cedula;
        if (usuario.Rol === 'Admin') {
          this.router.navigate(['/administrador']);
        } else if (usuario.Rol === 'Chef') {
          this.router.navigate(['/chef']);
        } else {
          alert('Correo o Password invalido');
        }
      });
  }
}
