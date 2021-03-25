import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pedido } from "../../Comunicacion/pedido";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-pedidos-sistema-admi',
  templateUrl: './pedidos-sistema-admi.component.html',
  styleUrls: ['./pedidos-sistema-admi.component.css']
})
export class PedidosSistemaAdmiComponent implements OnInit {
  Url = 'https://192.168.1.2:45455/';
  constructor(private http: HttpClient) {
    console.log(this.obtener_pedidos());
  }

  ngOnInit(): void {

  }

  private valores = new BehaviorSubject('');
  public valoresActuales = this.valores.asObservable();
  
  public cargarJson(): void {
    this.http.get<Pedido[]>(this.Url + "Pedido").subscribe(
      data => this.valores.next(data.toString())
    );
  }
  // obtiene todos los pedidos del cliente
  public obtener_pedidos() {
    let lista_pedidos: Pedido[] = [];
    this.http.get<Pedido[]>(this.Url + "Pedido").subscribe(data => {
      lista_pedidos = data;
      console.log(data);

    });
    return lista_pedidos;
  }
}
