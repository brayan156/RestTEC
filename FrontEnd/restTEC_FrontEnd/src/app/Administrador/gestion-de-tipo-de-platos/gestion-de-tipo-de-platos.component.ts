import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Plato } from "../../form-usuario/Comunicacion/plato";
import { HttpClient } from "@angular/common/http";




@Component({
  selector: 'app-gestion-de-tipo-de-platos',
  templateUrl: './gestion-de-tipo-de-platos.component.html',
  styleUrls: ['./gestion-de-tipo-de-platos.component.css']
})


export class GestionDeTipoDePlatosComponent implements OnInit {

  /**
   * Constructor del componete para la gestion de tipo de platos
   * @param service paramentro para la comunicacion con el servidor
   * @param http parametro para la comunicacion con el servidor
   */
  constructor(private service: PedidosActivosService, private http: HttpClient) { }



  public platos: Plato[]=[];
  public plato:Plato=new Plato;
  Url = 'https://192.168.1.3:45455/';
  ngOnInit(): void {
    this.http.get<Plato[]>(this.Url + "Plato").subscribe(data => {
      this.platos = data;
    });
  }

  /**
   * Funcion con la cual se crea un plato y se le envia al servidor
   * @param descripicon descipcion del plato
   * @param nombre nombre del plato
   * @param tiempo_preparacion tiempo de prepacion para el plato
   */
  crearPlato(descripicon: string, nombre: string,tiempo_preparacion:number): void {
    let plato: Plato = new Plato;
    plato.Nombre = nombre;
    plato.Descripcion = descripicon;
    plato.Tiempo_preparacion = tiempo_preparacion;
    this.service.crearplato(plato).subscribe(respuesta => {
      if (respuesta === "registro ingresado correctamente") {
        this.ngOnInit();
        this.platoCreado();
      } else {
        alert(respuesta);
      }
    });
  }

  /**
   * Alertas para crear,Actualizar plato.
   */
  platoCreado(): void{
    alert('El plato se creo correctamente');
  }
  errorPlato(): void{
    alert('No contiene la informacion minima para crear un plato');
  }
  actualizarPlato(descripicon: string, nombre: string, tiempo_preparacion: number,id:number): void{
    let plato: Plato = new Plato;
    plato.Nombre = nombre;
    plato.Descripcion = descripicon;
    plato.Tiempo_preparacion = tiempo_preparacion;
    plato.Numero_plato = id;
    this.service.editarplato(plato).subscribe(respuesta => {
      alert(respuesta);
      this.ngOnInit();
    });
  }

  ver(plato:Plato) {
    this.plato=plato
  }




  eliminarPlato(id:number): void {
    this.service.eliminarplato(id).subscribe(respuesta => {
      alert(respuesta);
      this.ngOnInit();
    });
  }
}
