import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Plato } from "../../form-usuario/Comunicacion/plato";


@Component({
  selector: 'app-gestion-de-tipo-de-platos',
  templateUrl: './gestion-de-tipo-de-platos.component.html',
  styleUrls: ['./gestion-de-tipo-de-platos.component.css']
})
export class GestionDeTipoDePlatosComponent implements OnInit {
  constructor( private service:PedidosActivosService) { }
  public platos: Plato;


  ngOnInit(): void {
    this.platos=this.service.obtener_platos();
  }
  crearPlato(descripicon: string, nombre: string,tiempo_preparacion:number): void {
    let plato: Plato = new Plato;
    plato.Nombre = nombre;
    plato.Descripcion = descripicon;
    plato.Tiempo_preparacion = tiempo_preparacion;
    this.service.crearplato(plato).subscribe(respuesta => {
      if (respuesta === "registro ingresado correctamente") {
        this.platoCreado();
      } else {
        alert(respuesta);
      }
    });
  }
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
    });
  }
  eliminarPlato(id:number): void {
    this.service.eliminarplato(id).subscribe(respuesta => {
      alert(respuesta);
    });
  }
}
