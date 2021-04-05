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
  public platos_sin_menu=[];
  public mostrar = false;
  public enlaceCreado = { Tipo: "", Calorias: 0, Precio: 0 };
  public tipo_menu="";
  /**
   * Constructor del Control del pedido
   */
  constructor(private pedidosActivosSistema: PedidosActivosService) {
  }

  /**
   * Inicialisa la pagina y hace todos los gets necesarios para la getion del menu
   */
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

  /**
   * Cambia el valor del plato actual
   * @param plato valor del plato
   */
  verplato(plato: Plato) {
    this.platoActual = plato;

  }

  /**
   * Cambia el valor del plato actual
   * Cambia el valor del plato dentro de la lista de platos en Menu
   * @param plato valor del plato
   * @param platoenMenu valor del plato dentro del menu
   */
  verplatoenmenu(plato:Plato, platoenMenu: PlatosEnMenu) {
    this.platoActual = plato;
    this.platoenMenu = platoenMenu;
  }

  /**
   * Funfion con la cual se ocultan y se muentran los platos dentro del menu
   * @param menu
   */
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

  /**
   * Eliminar o desligar un plato dentro del menu
   */
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

  /**
   * Funcion para obtener un plato del menu
   */
  obtener_platos_sin_menu() {
    this.platos_sin_menu=this.platos.filter(plato => this.platos_menu.every(data => data.N_plato !== plato.Numero_plato));
  }

  /**
   * Funcion para agregar un plato al menu
   * @param tipo el tipo de menu al que se desea agregar
   * @param calorias cantidad de calorias del plato
   * @param precio precio economico del plato
   */
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
          this.agredarPlato();
          this.ngOnInit();
        }
      });
    }
  }

  /**
   * Funcion para crear un menu con la comunicacion con el API
   * @param tipo el tipo de menu que se desea crear
   */
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

  /**
   * Funcion para editar menu(No se implemento en la parte grafica)
   */
  editar_menu() {
    this.pedidosActivosSistema.crearmenu(this.menuActual).subscribe(respuesta => {
      if (respuesta === "registro editado correctamente") {
        this.actualizarmenu();
        this.ngOnInit();
      }
    });
  }

  /**
   * Eliminar un menu conectado con el API, se utiliza para eliminar un menu especifico seleccionado desde la WEB
   * @param tipo el tipo de menu a eliminar
   */
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


  /**
   * Funcion para obtener los platos denetro del menu
   * @param menu
   * @constructor
   */
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
