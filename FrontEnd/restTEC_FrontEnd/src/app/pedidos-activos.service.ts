import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CarritoAlmacena } from "./form-usuario/Comunicacion/carrito-almacena";
import { Plato } from "./form-usuario/Comunicacion/plato";
import { Carrito } from "./form-usuario/Comunicacion/carrito";
import { CarritoGenera } from "./form-usuario/Comunicacion/carrito-genera";

@Injectable({
  providedIn: 'root'
})
export class PedidosActivosService {

  Url = 'https://192.168.1.2:45455/';
  private valores = new BehaviorSubject('');
  public valoresActuales = this.valores.asObservable();
  constructor(private http: HttpClient) { }

  public cargarJson(): void{
    this.http.get<any>(this.Url+"Pedido").subscribe(
      data => this.valores.next(data)
    );
  }

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

  //obtiene los numeros de plato y la cantidad comprada de un pedido
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
    });
    return platos;
  }
}
