import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Menu } from '../objetos/menu';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  password: string;
  constructor(private router: Router, private objetos: ObjetosService, private alert: AlertController) { }

  ngOnInit() {
  }

  login(form) {
    let validateClient = this.objetos.validar_cliente(this.correo, this.password)
    if (validateClient.Cedula != null) {
      console.log(validateClient.Cedula);
      this.router.navigateByUrl('/menu/tabs/tab2');
      this.objetos.ingresarmenu(this.objetos.getplatos_menu());
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
