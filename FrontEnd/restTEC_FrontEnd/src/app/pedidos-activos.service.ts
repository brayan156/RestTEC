import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CarritoAlmacena } from "./form-usuario/Comunicacion/carrito-almacena";
import { Plato } from "./form-usuario/Comunicacion/plato";
import { Carrito } from "./form-usuario/Comunicacion/carrito";
import { CarritoGenera } from "./form-usuario/Comunicacion/carrito-genera";
import { Menu } from "./form-usuario/Comunicacion/menu";
import { PlatosEnMenu } from "./form-usuario/Comunicacion/platos-en-menu";
import { Pedido } from "./form-usuario/Comunicacion/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidosActivosService {
  /**
   * Funcion de conexion para editar pedidos
   * @param pedido pedido que deseo editar
   */
  public editarpedido(pedido:Pedido) {
    return this.http.put(this.Url+"Pedido",pedido)
  };

  public cedula:number;


  Url = 'https://localhost:44385/';
  private valores = new BehaviorSubject('');
  public valoresActuales = this.valores.asObservable();
  constructor(private http: HttpClient) { }

  /**
   * Funcion para cargar los json del API
   */
  public cargarJson(): void{
    this.http.get<any>(this.Url+"Pedido").subscribe(
      data => this.valores.next(data)
    );
  }

  /**
   * Funcion de conexion con la API donde se reciven todos los pedidos
   */
  public obtenerPedidos() {
    return this.http.get<Pedido[]>(this.Url + "Pedido");
  }

  /**
   * Funcion con la cual se obtiende los paltos y la cantidad de plato de un pedido
   * navegando entre las funciones del API .
   * @param N_pedido numero del pedido
   */
  public sacar_nombre_cantidad(N_pedido: number) {
    var almacen: CarritoAlmacena[] = []
    var car: Carrito = new Carrito
    var platos_con_nombre = []
    this.http.get<CarritoGenera>(this.Url + "Carrito_genera/npedido/" + N_pedido).subscribe(carrito_genera => {
      this.http.get<Carrito[]>(this.Url + "Carrito").subscribe(carritos => {
        for (let i = 0; i < carritos.length; i++) {
          if (carritos[i].N_compra === carrito_genera.N_compra && carritos[i].Id === carrito_genera.Id_carrito) {
            car = carritos[i];
            break;
          }
        }
        this.http.get<CarritoAlmacena[]>(this.Url + "Carrito_almacena/carrito/" + car.Id + "/" + car.N_compra)
          .subscribe(carritos_almacena => {
            almacen = carritos_almacena;

            var platos: Plato[] = [];
            this.http.get<Plato[]>(this.Url + "Plato").subscribe(data => {
              platos = data;
              platos.forEach(plato => {
                almacen.forEach(dato_almacen => {
                  if (plato.Numero_plato === dato_almacen.N_plato) {
                    var plato_con_nombre = { cantidad: dato_almacen.Cantidad, nombre: plato.Nombre };
                    platos_con_nombre.push(plato_con_nombre);
                    console.log(plato_con_nombre);
                  }
                });
              });
            });
          });
      });
    });
    return platos_con_nombre;
  }

  /**
   * obtiene los numeros de plato y la cantidad comprada de un pedido
   * @param N_pedido numero del pedido
   */
  public obtener_almacen_pedido(N_pedido: number) {
    var almacen:CarritoAlmacena[]=[]
    var car: Carrito = new Carrito
    this.http.get<CarritoGenera>(this.Url + "Carrito_genera/n_pedido/" + N_pedido).subscribe(carrito_genera => {
      this.http.get<Carrito[]>(this.Url + "Carrito").subscribe(carritos => {
        for (let i = 0; i < carritos.length; i++) {
          if (carritos[i].N_compra === carrito_genera.N_compra && carritos[i].Id === carrito_genera.Id_carrito) {
            car = carritos[i];
            break;
          }
        }
        this.http.get<CarritoAlmacena[]>(this.Url + "Carrito_almacena/carrito/" + car.Id + "/" + car.N_compra)
          .subscribe(carritos_almacena => {
            almacen = carritos_almacena;
          });


      })
    });
    return almacen;
  }
  //obtiene el carrito de un pedido
  public obtener_carrito_pedido(N_pedido: number) {
    var car: Carrito = new Carrito
    this.http.get<CarritoGenera>(this.Url + "Carrito_genera/npedido/" + N_pedido).subscribe(carrito_genera => {
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
  public obtener_platos() {
    var platos: Plato[] = [];
    this.http.get<Plato[]>(this.Url + "Plato").subscribe(data => {
      platos = data;
      console.log(platos);
    });
    return platos;
  }

  /**
   * Obtiene los platos almacenados por el administrador que se encuentran en el API
   */
  public getPlatos() {
    return this.http.get<Plato[]>(this.Url + "Plato");
  }
  /**
   * Crea un nuevo plato lo almacena en el API
   */
  public crearplato(plato: Plato) {
    return this.http.post<String>(this.Url + "Plato",plato);
  }

  /**
   * Elimina un plato de los que estan almacenados en el API
   * @param id ID del plato que se desea eliminar
   */
  public eliminarplato(id: number) {
    return this.http.delete<String>(this.Url + "Plato/" + id);
  }

  /**
   * Edita los valores de un plato y lo guarda en el API
   * @param plato que se va editar
   */
  public editarplato(plato: Plato) {
    return this.http.put<String>(this.Url + "Plato",plato);
  }


  /**
   * Obtiene el menu que se encuentra gurdado dentro del API
   */
  public getMenu() {
    return this.http.get<Menu[]>(this.Url + "Menu");
  }

  /**
   * Crea un nuevo tipo de Menu y lo gurada en el API
   * @param menu el valor con el cual se crea un nuevo MENU
   */

  public crearmenu(menu: Menu) {
    return this.http.post<String>(this.Url + "Menu", menu);
  }

  /**
   * Elimina un Menu de los que estan almacenados en el API
   * @param id ID del menu a eliminar
   */
  public eliminarmenu(id: number) {
    return this.http.delete<String>(this.Url + "Menu/" + id);
  }

  /**
   * No se utiliza se decidio no editar menus
   * @param menu ID del menu
   */
  public editarmenu(menu: Menu) {
    return this.http.put<String>(this.Url + "Menu", menu);
  }

  /**
   * Obtiene los platos dentro del menu comunicacdo con el API
   */
  public getPlatoenmenu() {
    return this.http.get<PlatosEnMenu[]>(this.Url + "Platos_en_Menu");
  }

  /**
   * Enlaza un nuevo plato en el Menu
   * @param platoenmenu Plato que desea guardar dentro del menu
   */
  public crearplatoenmenu(platoenmenu: PlatosEnMenu) {
    return this.http.post<String>(this.Url + "Platos_en_Menu", platoenmenu);
  }

  /**
   * Desenlza un plato especifico de un menu especifico y lo comunica al API
   * @param id_menu ID al que le deseo desligar el plato
   * @param id_plato ID del plato que deseo desligar del menu
   */
  public eliminarplatoenmenu(id_menu: number,id_plato) {
    return this.http.delete<String>(this.Url + "Platos_en_Menu/" + id_menu+"/"+id_plato);
  }

  /**
   * Se edita el un plato especidio dentro del Menu
   * @param platoenmenu plato en menu que desea editar
   */
  public editarplatoenmenu(platoenmenu: PlatosEnMenu) {
    return this.http.put<String>(this.Url + "Platos_en_Menu", platoenmenu);
  }

}



