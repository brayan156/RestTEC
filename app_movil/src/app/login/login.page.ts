import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cliente } from '../objetos/cliente';
import { Menu } from '../objetos/menu';
import { ObjetosService } from '../services/objetos.service';
import { Carrito } from "../objetos/carrito";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  password: string;
  constructor(private router: Router, private objetos: ObjetosService, private alert: AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

  login(form) {
      this.objetos.validar_cliente(this.correo, this.password).subscribe(data => {
        this.objetos.cliente = data;
        console.log(this.objetos.cliente.Primer_Nombre);
        if (this.objetos.cliente.Cedula != null && this.objetos.cliente.Cedula != 0) {
          this.http.get<Carrito>(this.objetos.Url + "Carrito/obtener_carrito_actual_cedula/" + this.objetos.cliente.Cedula).subscribe(carrito => {
            this.objetos.carrito = carrito;
            console.log(carrito.N_compra);
            if (this.objetos.cliente != null && this.objetos.cliente.Cedula != 0) {
              this.router.navigateByUrl('/menu/tabs/tab2');
            } 
          });
        } else { this.presentAlert();
        };
      });
  }

  login_aux(validateClient) {
    if (validateClient.Cedula != null && validateClient.Cedula != 0) {
      this.router.navigateByUrl('/menu/tabs/tab2');
    } else {
      this.presentAlert();
    };
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Datos inválidos',
      subHeader: 'Por favor corrija sus datos',
      buttons: ['OK']
    });

    await alert.present();
  }
}
