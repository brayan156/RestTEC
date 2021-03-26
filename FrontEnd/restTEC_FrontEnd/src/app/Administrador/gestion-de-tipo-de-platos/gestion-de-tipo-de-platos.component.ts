import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-gestion-de-tipo-de-platos',
  templateUrl: './gestion-de-tipo-de-platos.component.html',
  styleUrls: ['./gestion-de-tipo-de-platos.component.css']
})
export class GestionDeTipoDePlatosComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  crearPlato(): void{
    alert('El plato ha sido creado con exito');
  }
  errorPlato(): void{
    alert('No contiene la informacion minima para crear un plato');
  }
  eliminarPlato(): void{
    alert('El plato ha sido eliminado con exito');
  }
  actualizarPlato(): void{
    alert('El plato ha sido actualizado con exito');
  }
}
