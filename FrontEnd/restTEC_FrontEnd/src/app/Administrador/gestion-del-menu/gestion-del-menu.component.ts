import { Component, OnInit } from '@angular/core';
import { PedidosActivosService } from "../../pedidos-activos.service";
import { Pedido } from "../../form-usuario/Comunicacion/pedido";
import { Menu } from "../../form-usuario/Comunicacion/menu";
import { Plato } from "../../form-usuario/Comunicacion/plato";
import { PlatosEnMenu } from "../../form-usuario/Comunicacion/platos-en-menu";

@Component({
  selector: 'app-gestion-del-menu',
  templateUrl: './gestion-del-menu.component.html',
  styleUrls: ['./gestion-del-menu.component.css']
})
export class GestionDelMenuComponent implements OnInit {
  /**
   * Constructor del componenete de la gestion menu
   */
  public platos_con_nombre;
  public menus;
  public platos;
  public platos_menu;
  public menuActual = new Menu;
  public platoActual = new Plato;
  public platoenMenu
  public datosActual=[];
  public Cedula;
  public platos_sin_menu=[]

  /**
   * Constructor del Control del pedido
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {

  }

  ngOnInit(): void {
    this.Cedula = this.pedidosActivosSistema.cedula;
    this.pedidosActivosSistema.getMenu().subscribe(menus => {
      this.menus = menus;
      this.pedidosActivosSistema.getPlatos().subscribe(platos => {
        this.platos = platos;
        this.pedidosActivosSistema.getPlatoenmenu().subscribe(datosPlatoMenu => {
          this.platos_menu = datosPlatoMenu;

        });
      });
    });

  }

  ver(platoenMenu: PlatosEnMenu) {
    this.platoenMenu = platoenMenu;
  }


  editar_plato_en_menu() {
    this.pedidosActivosSistema.editarplatoenmenu(this.platoenMenu).subscribe(respuesta => {
      if (respuesta === "registro editado correctamente") {
        this.editarPlato();
        this.ngOnInit();
      }
    });}

  eliminar_plato_en_menu(platoenmenu: PlatosEnMenu) {
    this.pedidosActivosSistema.eliminarplatoenmenu(platoenmenu.N_Menu, platoenmenu.N_plato).subscribe(r => {
      if (r === "registro eliminado exitosamente") {
        this.eliminarPlato();
        this.ngOnInit();
      }
      else {

        alert("elimine todos los platos del menu primero");
      }
});
  }

  obtener_platos_sin_menu() {
    this.platos_sin_menu=this.platos.filter(plato => this.platos_menu.every(data => data.N_plato !== plato.Numero_plato));
  }

  agregar_plato_menu(id_plato:number, calorias:number,precio:number) {
    var plato_menu: PlatosEnMenu = new PlatosEnMenu;
    plato_menu.N_plato = id_plato;
    plato_menu.Calorias = calorias.toString();
    plato_menu.Precio = precio;
    plato_menu.N_Menu = this.menuActual.Numero_menu;
    plato_menu.Ganancia = 0;
    plato_menu.Ventas = 0;
    this.pedidosActivosSistema.crearplatoenmenu(plato_menu).subscribe(respuesta => {
      if (respuesta === "registro ingresado correctamente") {
        this.editarPlato();
        this.ngOnInit();
      }
    });
  }

  agregar_menu(tipo: string) {
    var menu: Menu = new Menu;
    menu.Tipo = tipo;
    this.pedidosActivosSistema.crearmenu(menu).subscribe(respuesta => {
      if (respuesta === "registro ingresado correctamente") {
        this.agredarMenu();
        this.ngOnInit();
      }
    });
  }
  editar_menu() {
    this.pedidosActivosSistema.crearmenu(this.menuActual).subscribe(respuesta => {
      if (respuesta === "registro editado correctamente") {
        this.editar_menu();
        this.ngOnInit();
      }
    });
  }

  eliminar_menu() {
    if (PlatosEnMenu.length === 0) {
      this.pedidosActivosSistema.eliminarmenu(this.menuActual.Numero_menu).subscribe(respuesta => {
        if (respuesta === "registro eliminado exitosamente") {
          this.editar_menu();
          this.ngOnInit();
        }
      });
    } else {
      alert("elimine todos los platos del menu primero");
    }
  }



  Ver_platos_menu(menu: Menu): void {
    this.menuActual = menu;
    this.datosActual=[]
    var datos_menu: PlatosEnMenu[] = this.platos_menu.filter(pm => pm.N_Menu === menu.Numero_menu);
    datos_menu.forEach(dato => {
      let plato: Plato = this.platos.find(plato => plato.Numero_plato === dato.N_plato);
      this.datosActual.push({plato:plato, datosMenu:dato});
    });
  }


  /**
   * Alrtas que se utilizaran en la creacion, elminacion o actualizacion de los platos
   */
  eliminarPlato(): void{
    alert('El plato ha sido eliminado del menu');
  }
  agredarPlato(): void{
    alert('El plato ha sido agregado al menu');
  }
  editarPlato(): void {
    alert('El plato ha sido editado en el menu');
  }
  agredarMenu(): void {
    alert('Se ha creado el menu');
  }
  actualizarPlato(): void{
    alert('El plato ha sido actualizado con exito');
  }
  actualizarmenu(): void {
    alert('El menu ha sido actualizado con exito');
  }

}
