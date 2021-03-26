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
  newClientPhone1: number = null;
  newClientPhone2: number = null;
  newclientPhone3: number = null;
  listaTelefonos = [this.newClientPhone1, this.newClientPhone2, this.newclientPhone3];
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

    this.objetosService.crear_cliente(this.newClient, this.listaTelefonos);
  }


}
