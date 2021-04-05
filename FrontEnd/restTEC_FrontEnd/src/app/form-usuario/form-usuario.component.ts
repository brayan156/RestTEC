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
  Url = 'https://localhost:44385/';

  /**
   * Constructor de la vista From-Usuario
   * @param router router que se utiliza para rediririgir la pagina
   * @param http Se utliza para la comunicacion cliente-servidor (WEB/API)
   * @param pedidosActivosSistema mostrar los pedidos activos dentro del sistema
   */
  constructor(
    private router: Router, private http: HttpClient, private pedidosActivosSistema: PedidosActivosService) {
  }
  ngOnInit(): void {
  }

  /**
   * Funcion que se utliza para verificar el correo electronico y el password de la vista de login
   * en caso de que exista el error se recivira una aletar por parte de la aplicacion web
   */
  goTo(): void {
    this.http.get<LoginComunication>(this.Url + "Usuario/validar_Usuario/" + this.manejoLogin.Email + "/" + this.manejoLogin.Password).subscribe(
      usuario => {
        this.manejoLogin.Cedula = usuario.Cedula;
        this.pedidosActivosSistema.cedula = usuario.Cedula;
        if (usuario.Rol === 'Admin') {
          this.router.navigate(['/administrador']);
        } else if (usuario.Rol === 'Chef') {
          this.router.navigate(['/chef/pedidosSistema']);
        } else {
          alert('Correo o Password invalido');
        }
      });
  }
}
