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
import { CarritoGenera } from "../objetos/carrito-genera";
import { CarritoAlmacena } from "../objetos/carrito-almacena";

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  menu = []

  tmpMenu = [
    {
      plato: "Lentejas con platano maduro",
      descripcion: "Deliciosas lentejas en sopa, con pimienta que le da cierto picor." ,
      precio: "800",
      calorias: "200",
      tipo: "almuerzo",
      cant: 1
    },
    {
      plato: "Sopa azteca",
      descripcion: "Una sopita tradicional de méxico a base de un caldo de tomate." ,
      precio: "650",
      calorias: "250",
      tipo: "cena",
      cant: 1
    },
    {
      plato: "Cereal con leche",
      descripcion: "Kelloggs con banano y leche deslactosada." ,
      precio: "300",
      calorias: "150",
      tipo: "desayuno",
      cant: 1
    }
  ]

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

  getMenu() {
    return this.tmpMenu;
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
        plato_app.tiempo_preparacion = plato.Tiempo_preparacion;
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

    return this.http.get<Cliente>(this.Url + "Cliente/validar_cliente/" + correo + "/" + contraseña);

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
            let tel: Telefonos = new Telefonos();
            tel.ID_cliente = cliente.Cedula;
            tel.Telefono = telofono;
            this.http.post<String>(this.Url + "Telefonos", tel);
          });
        }
      });
    }
    return respuesta;
  }


 

  //obtiene todos los carrito_genera del id del carrito del cliente
  public obtener_carritos_genera() {
    let lista_carrito_genera: CarritoGenera[] = [];
    this.http.get<CarritoGenera[]>(this.Url + "Carrito_genera/Id_carrito/"+this.carrito.Id).subscribe(data => {
      lista_carrito_genera = data;
    });
    return lista_carrito_genera;
  }

  // obtiene todos los pedidos del cliente
  public obtener_pedidos() {
    let lista_carrito_genera: CarritoGenera[] = [];
    let lista_pedidos: Pedido[] = [];
    this.http.get<Pedido[]>(this.Url + "Pedido").subscribe(data => {
      lista_carrito_genera.forEach(carritoGenera => {
        data.forEach(pedido => {
          if (pedido.Numero === carritoGenera.Id_pedido) {
            lista_pedidos.push(pedido);
          }
        });
      });
    });
    return lista_pedidos;
  }


  //obtiene el carrito de un pedido
  public obtener_carrito_pedido(N_pedido: number) {
    var car:Carrito=new Carrito
    this.http.get<CarritoGenera>(this.Url + "Carrito_genera/n_pedido/" + N_pedido).subscribe(carrito_genera => {
      this.http.get<Carrito[]>(this.Url + "Carrito").subscribe(carritos => {
        for (let i = 0; i < carritos.length; i++) {
          if (carritos[i].N_compra === carrito_genera.N_compra && carritos[i].Id === carrito_genera.Id_carrito) {
            car = carritos[i];
            break;
          }
        }
      })
    });
    return car;
  }


  //obtiene los numeros de plato y la cantidad comprada de un pedido
  public obtener_almacen_pedido(N_pedido: number) {
    var almacen:CarritoAlmacena[]=[]
    let carrito: Carrito = this.obtener_carrito_pedido(N_pedido);
    this.http.get<CarritoAlmacena[]>(this.Url + "Carrito_almacena/carrito/" + carrito.Id + "/" + carrito.N_compra)
      .subscribe(carritos_almacena => {
        almacen= carritos_almacena;
      });
    return almacen;
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
