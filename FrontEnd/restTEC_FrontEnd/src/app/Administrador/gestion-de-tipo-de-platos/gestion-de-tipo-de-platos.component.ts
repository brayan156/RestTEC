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
  Url = 'https://localhost:44385/';
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
    plato.Ganancia = 0;
    plato.Ventas = 0;
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

  /**
   * Esta funcion se utliza para modificar un plato funciona de tal forma que un plato es llamado por un boton desde el html y
   * segun los valores dentro de los labels cambia o actualiza los datos
   * @param descripicon valor de la nueva descripcion del plato
   * @param nombre valor del nuevo nombre del plato
   * @param tiempo_preparacion valor para el nuevo tiempo de preparacion
   * @param id id del plato que deseo cambiar
   */
  actualizarPlato(descripicon: string, nombre: string, tiempo_preparacion: number,id:number): void{
    let plato: Plato = new Plato;
    plato.Nombre = nombre;
    plato.Descripcion = descripicon;
    plato.Tiempo_preparacion = tiempo_preparacion;
    plato.Numero_plato = id;
    plato.Ganancia = this.plato.Ganancia;
    plato.Ventas = this.plato.Ventas;
    this.service.editarplato(plato).subscribe(respuesta => {
      alert(respuesta);
      this.ngOnInit();
    });
  }

  /**
   * Cambia el valor del plato
   * @param plato
   */
  ver(plato:Plato) {
    this.plato = plato;
  }


  /**
   * Funcion que se utiliza para eliminar el plato
   * @param id ID del plato que se desea eliminar
   */

  eliminarPlato(id: number): void {
    this.service.getCarritos_almacena().subscribe(almacen => {
      if (almacen.some(al => al.N_plato === id)) {
        alert(
          "El plato ya ha sido comprado y contiene informacion valiosa para el sistema, si desea retirarlo, eliminelo del menu");
      } else {
        this.service.getPlatoenmenu().subscribe(platomenus => {
          if (platomenus.some(p => p.N_plato === id)) {
            alert("elimina primero la conexion del plato al menu");
          } else {
            this.service.eliminarplato(id).subscribe(respuesta => {
              alert(respuesta);
              this.ngOnInit();
            });
          }
        });
      }
    });


  }
}
