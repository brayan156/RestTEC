import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Menu } from '../objetos/menu';
import { Plato } from "../objetos/plato";
import { PlatosEnMenu } from "../objetos/platos-en-menu";
import { PlatoApp } from "../objetos/plato-app";
import { Cliente } from "../objetos/cliente";
import { Carrito } from "../objetos/carrito";
import { Telefonos } from '../objetos/telefonos';
import { Pedido } from "../objetos/pedido";
import { Feedback } from "../objetos/feedback";

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  constructor(private http: HttpClient) { }

  public cliente: Cliente = new Cliente;
  Url = 'https://192.168.1.2:45455/';
  public carrito: Carrito = new Carrito;
  Plato = {
    plato: "Lentejas con platano maduro",
    descripcion: "Deliciosas lentejas en sopa, con pimienta que le da cierto picor.",
    precio: "800",
    calorias: "200",
    tipo: "almuerzo",
    cant: 1
  }


  menu = [
  ]



  getMenu() {
    return this.menu;
  }

  public ingresarmenu(platos) {
    this.menu = platos;
  }


  //funcion que contruye los platos a mostrar al cliente
  public getplatos_menu() {
    let lista_app: PlatoApp[] = new Array<PlatoApp>();
    var lista_platos: Plato[] = new Array<Plato>();
    this.http.get<Plato[]>(this.Url + "Plato").subscribe(data => {
      lista_platos = data;
      lista_platos.forEach(plato => {
        let plato_app: PlatoApp = new PlatoApp;
        plato_app.plato = plato.Nombre;
        plato_app.descripcion = plato.Descripcion;
        plato_app.n_plato = plato.Numero_plato;
        this.http.get<PlatosEnMenu>(this.Url + "Platos_en_Menu/nplato/" + plato.Numero_plato).subscribe(datos_menu => {
          if (datos_menu.N_Menu !== 0) {
            plato_app.calorias = datos_menu.Calorias;
            plato_app.precio = datos_menu.Precio.toString();
            this.http.get<Menu>(this.Url + "Menu/nmenu/" + datos_menu.N_Menu).subscribe(menu => {
              plato_app.tipo = menu.Tipo;
              lista_app.push(plato_app);
            });
          }
        });
      });
    });
    return lista_app;
  }

  //funcion para verificar el login y obtener el id de su carrito y por la compra en la que va
  public validar_cliente(correo: String, contraseña: String) {

    this.http.get<Cliente>(this.Url + "Cliente/validar_cliente" + correo + "/" + contraseña).subscribe(data => {
      this.cliente = data;
      if (this.cliente.Cedula !== 0) {
        this.http.get<Carrito>(this.Url + "Carrito/obtener_carrito_actual_cedula" + this.cliente.Cedula).subscribe(carrito => {
          this.carrito = carrito;
        });
      }
    });
  }

  //funcion para registrarse, añade un nuevo cliente mandarlo a la parte de login luego de esto
  public crear_cliente(cliente: Cliente, telefonos:number[]) {
    let respuesta:String = "";
    if (telefonos === []) {
      respuesta = "se requiere al menos un telefono";
    } else {
      this.http.post<String>(this.Url + "Cliente", cliente).subscribe(resp => {
        respuesta = resp;
        if (respuesta === "registro ingresado correctamente") {
          telefonos.forEach(telofono => {
            let tel: Telefonos = new Telefonos;
            tel.ID_cliente = cliente.Cedula;
            tel.Telefono = telofono;
            this.http.post(this.Url + "Telefonos", tel);
          });
        }
      });
    }
    return respuesta;
  }


  // obtiene todos los pedidos del cliente
  public obtener_pedidos() {
    let pedidos: Pedido[] = [];
    this.http.get<Pedido[]>(this.Url + "Pedido/pedidos_carrito"+this.carrito.Id).subscribe(data => {
      pedidos = data;
    });
    return pedidos;
  }

  //funcion a llamar cuando se le da al boton para decir que recibio el producto guardar el id del pedido para crear el feedback
  public pedido_recibido(pedido:Pedido) {
    this.http.put(this.Url + "Pedido", pedido);
  }

  //funcion para enviar el feedback a la base datos colocar los datos necesarios
  public dar_feedback(feedback: Feedback) {
    this.http.post(this.Url + "Feedback", feedback);
  }
}
