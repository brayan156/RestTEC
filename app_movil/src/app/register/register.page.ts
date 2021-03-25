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
export class RegisterPage implements OnInit {

  newClient: Cliente = new Cliente();
  newClientPhone: number;
  birthDate: string;
  constructor(private router: Router, private objetosService: ObjetosService) { }


  ngOnInit() {
  }

  register(form) {
    this.router.navigateByUrl('');
    this.newClient.AñoNacimiento = (this.birthDate.slice(0, 4));
    this.newClient.Mes_Nacimiento = (this.birthDate.slice(5, 7));
    this.newClient.Día_Nacimiento = (this.birthDate.slice(8, 10));

    var clientPhones = [
      this.newClientPhone
    ]
    console.log(clientPhones);
    this.objetosService.crear_cliente(this.newClient, clientPhones);
  }

}
