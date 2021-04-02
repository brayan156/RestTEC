import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../objetos/cliente';
import { Telefonos } from '../objetos/telefonos';
import { ObjetosService } from '../services/objetos.service';
import { AlertController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';

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
  constructor(private router: Router, private http: HttpClient, private objetosService: ObjetosService, private alert: AlertController) { }


  ngOnInit() {
  }
  Url = 'https://192.168.1.3:45455/';
  /**
   * Valida los datos ingresados y realiza las navegaciones dentro del 
   * app
   * @param form 
   */
  register(form) {
    try {
      this.listaTelefonos = [this.newClientPhone1, this.newClientPhone2, this.newclientPhone3];
          this.newClient.AñoNacimiento = (this.birthDate.slice(0, 4));
    this.newClient.Mes_Nacimiento = (this.birthDate.slice(5, 7));
      this.newClient.Día_Nacimiento = (this.birthDate.slice(8, 10));
      console.log(this.listaTelefonos);
    var telefonoscliente: number[] = this.listaTelefonos.filter(tel => (tel !== null && tel!== undefined));
      let respuesta: String = "Por favor agregue sus datos correctamente";
      if (telefonoscliente === []) {
        respuesta = "se requiere al menos un telefono";
        this.presentAlert(respuesta)
    } else {
        return this.http.post<String>(this.Url + "Cliente", this.newClient).subscribe(resp => {
        respuesta = resp;
        if (respuesta === "registro ingresado correctamente") {
          let ntelefonos: Telefonos[] = [];
          telefonoscliente.forEach(telofono => {
            let tel: Telefonos = new Telefonos();
            tel.ID_cliente = this.newClient.Cedula;
            tel.Telefono = telofono;
            ntelefonos.push(tel);
          });
          this.http.post<String>(this.Url + "Telefonos", ntelefonos).subscribe(r => {
              if (r === "registro ingresado correctamente") {
                this.presentAlert(respuesta)
                this.router.navigateByUrl('');
              } else {
                this.presentAlert(r);
                return this.http.delete<String>(this.Url + "Cliente/" + this.newClient.Cedula).subscribe(res => {
                  console.log("elminadocliente");
                  });
              }
            }
          );

        } else {
          this.presentAlert(respuesta);
        }
        });
      }

    } catch (e) {
      this.presentAlertincomplete();
    } 
  }


  async presentAlert(respuesta:String) {
    const alert = await this.alert.create({
      header: 'Mensaje',
      subHeader: respuesta.toString(),
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertincomplete() {
    const alert = await this.alert.create({
      header: 'Datos inválidos',
      subHeader: 'Por favor agregue sus datos correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  back() {
    this.router.navigateByUrl('');
  }

}
