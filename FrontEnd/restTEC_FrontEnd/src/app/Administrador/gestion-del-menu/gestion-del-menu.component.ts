import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-del-menu',
  templateUrl: './gestion-del-menu.component.html',
  styleUrls: ['./gestion-del-menu.component.css']
})
export class GestionDelMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  eliminarPlato(): void{
    alert('El plato ha sido eliminado del menu');
  }
  agredarPlato(): void{
    alert('El plato ha sido agregado al menu');
  }
  actualizarPlato(): void{
    alert('El plato ha sido actualizado con exito');
  }

}
