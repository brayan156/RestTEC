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
  public platoenMenu=new PlatosEnMenu;
  public datosActual=[];
  public Cedula;
  public platos_sin_menu=[]
  public mostrar = false;
  public enlaceCreado = { Tipo: "", Calorias: 0, Precio: 0 };
  public tipo_menu="";
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
          this.obtener_platos_sin_menu();
        });
      });
    });
  }

  verplato(plato: Plato) {
    this.platoActual = plato;

  }

  verplatoenmenu(plato:Plato, platoenMenu: PlatosEnMenu) {
    this.platoActual = plato;
    this.platoenMenu = platoenMenu;
  }

  // tslint:disable-next-line:typedef
  mostraOcular(menu){
    // tslint:disable-next-line:triple-equals
    this.menuActual = menu;
    if (this.mostrar == false){
      this.mostrar = true;
    }else {
      this.mostrar = false;
    }
    this.Ver_platos_menu(menu);
  }
  editar_plato_en_menu() {
    this.pedidosActivosSistema.editarplatoenmenu(this.platoenMenu).subscribe(respuesta => {
      if (respuesta === "registro editado correctamente") {
        this.editarPlato();
        this.ngOnInit();
      }
    });}

  eliminar_plato_en_menu() {
    this.pedidosActivosSistema.eliminarplatoenmenu(this.platoenMenu.N_Menu, this.platoenMenu.N_plato).subscribe(r => {
      if (r === "registro eliminado exitosamente") {
        this.eliminarPlato();
        this.ngOnInit();
        if (this.mostrar == false) {
          this.mostrar = true;
        } else {
          this.mostrar = false;
        }
      }
      else {

        alert("no se podido elminar el enlace correctamente");
      }
});
  }

  obtener_platos_sin_menu() {
    this.platos_sin_menu=this.platos.filter(plato => this.platos_menu.every(data => data.N_plato !== plato.Numero_plato));
  }

  agregar_plato_menu(tipo:string, calorias:number,precio:number) {
    var menus: Menu[] = this.menus.filter(menu => menu.Tipo === tipo);
    if (menus.length === 0) {
      alert("ingrese el nombre de un menu existente");
      this.ngOnInit();
    } else {
      var plato_menu: PlatosEnMenu = new PlatosEnMenu;
      plato_menu.N_plato = this.platoActual.Numero_plato;
      plato_menu.Calorias = calorias.toString();
      plato_menu.Precio = precio;
      plato_menu.N_Menu = menus[0].Numero_menu;
      this.pedidosActivosSistema.crearplatoenmenu(plato_menu).subscribe(respuesta => {
        if (respuesta === "registro ingresado correctamente") {
          this.editarPlato();
          this.ngOnInit();
        }
      });
    }
  }

  agregar_menu(tipo: string) {
    var menu: Menu = new Menu;
    menu.Tipo = tipo;
    this.pedidosActivosSistema.crearmenu(menu).subscribe(respuesta => {
      if (respuesta === "registro ingresado correctamente") {
        this.agredarMenu();
        this.ngOnInit();
      } else {
        alert("no se pudo crear el menu");
      }
    });
  }
  editar_menu() {
    this.pedidosActivosSistema.crearmenu(this.menuActual).subscribe(respuesta => {
      if (respuesta === "registro editado correctamente") {
        this.actualizarmenu();
        this.ngOnInit();
      }
    });
  }

  eliminar_menu(tipo: string) {
    console.log("llego a la funcion");
    var menus: Menu[] = this.menus.filter(menu => menu.Tipo === tipo);
    if (menus.length === 0) {
      alert("ingrese el nombre de un menu existente");
      this.ngOnInit();
    } else {
      console.log("existe");
      this.Ver_platos_menu(menus[0]);
      if (this.datosActual.length === 0) {
        console.log("vacio");
        this.pedidosActivosSistema.eliminarmenu(menus[0].Numero_menu).subscribe(respuesta => {
          if (respuesta === "registro eliminado exitosamente") {
            console.log("eliminado");
            this.eliminarmenu();
            this.ngOnInit();
          } else {
            alert(respuesta);
          }
        });
      } else {
        alert("elimine todos los platos del menu primero");
      }
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
  eliminarmenu(): void {
    alert('El menu ha sido eliminado con exito');
  }

}
