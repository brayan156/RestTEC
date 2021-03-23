import { Injectable } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Tab2PageModule } from '../tab2/tab2.module';
import { Tab2Page } from "../tab2/tab2.page";
import { PlatoApp } from "../objetos/plato-app";
import { HttpClient } from "@angular/common/http";
import { CarritoAlmacena } from "../objetos/carrito-almacena";
import { ObjetosService } from '../services/objetos.service';
import { Carrito } from "../objetos/carrito";
import { Factura } from "../objetos/factura";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Esta es la lista que almacena lo que esta dentro del carrito
  private data: PlatoApp[] = [];

  constructor(private http: HttpClient,private objetos:ObjetosService) { }

  Url = 'https://192.168.1.2:45455/';

  // Aqui recibe platos para agregarlos al carrito conforme recibe
  setData(platoEntrante) {
    if (this.data.length == 0) { this.data.push(platoEntrante) } else {
      this.data.forEach(plato => {
        if (plato.plato == platoEntrante.plato) {
          plato.cant += 1;
          console.log(plato.cant, 'salud')
        } else {
          this.data.push(platoEntrante);
        }
      })
    }
  }
  getData() {
    return this.data;
  }

  //funcion a llamar cuando se compra sirve para cambiar de numero de pedido y crear la factura a mostrar al cliente 
  public comprar() {
    var platos: CarritoAlmacena[] = [];
    var factura: Factura = new Factura;
    var platos_con_nombre=[]
    this.data.forEach(plato_app => {
      let plato_almacena: CarritoAlmacena = new CarritoAlmacena;
      plato_almacena.N_plato = plato_app.n_plato;
      plato_almacena.Cantidad = plato_app.cant;
      plato_almacena.Id_carrito = this.objetos.carrito.Id;
      plato_almacena.N_compra = this.objetos.carrito.N_compra;
      platos.push(plato_almacena);
      this.http.post<String>(this.Url + "Carrito_almacena", plato_almacena);
      let plato_con_nombre = { cantidad:plato_almacena.Cantidad , nombre:plato_app.plato};
      platos_con_nombre.push(plato_con_nombre);
    });
    this.http.post<Factura>(this.Url + "Carrito/comprar", this.objetos.carrito.N_compra).subscribe(fact => {
      this.objetos.carrito.N_compra += 1;
      this.objetos.carrito.Monto = 0;
      factura = fact;
    });
    return { detalle:factura, plato_y_cantidad:platos_con_nombre};
  }

}
