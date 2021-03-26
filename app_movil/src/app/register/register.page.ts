import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../objetos/cliente';
import { Telefonos } from '../objetos/telefonos';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

/**
 * Esta pagina genera la tab para realizar el registro de un cliente.
 */
export class RegisterPage implements OnInit {

  newClient: Cliente = new Cliente();
  newClientPhone: number = null;
  listaTelefonos = [this.newClientPhone];
  birthDate: string;

  /**
   * Constructor
   * @param router 
   * @param objetosService 
   */
  constructor(private router: Router, private objetosService: ObjetosService) { }


  ngOnInit() {
  }

  /**
   * Valida los datos ingresados y realiza las navegaciones dentro del 
   * app
   * @param form 
   */
  register(form) {
    this.router.navigateByUrl('');
    this.newClient.AñoNacimiento = (this.birthDate.slice(0, 4));
    this.newClient.Mes_Nacimiento = (this.birthDate.slice(5, 7));
    this.newClient.Día_Nacimiento = (this.birthDate.slice(8, 10));

    var clientPhones = [
      this.newClientPhone
    ]
    this.objetosService.crear_cliente(this.newClient, clientPhones);
  }

  masTelefonos() {
    this.listaTelefonos.push(this.newClientPhone);
  }

  menosTelefonos() {
    if (this.listaTelefonos.length > 1) {
      this.listaTelefonos.pop();
    }
  }

}
