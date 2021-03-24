import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VistaAdministradorComponent} from './Administrador/vista-administrador/vista-administrador.component';
import {VistaChefComponent} from './Chef/vista-chef/vista-chef.component';
import {NavbarAdministradorComponent} from './Administrador/navbar-administrador/navbar-administrador.component';
import {GestionMenuComponent} from './Administrador/gestion-menu/gestion-menu.component';
import {GestionTipoPlatoComponent} from './Administrador/gestion-tipo-plato/gestion-tipo-plato.component';
import {PedidoActivoComponent} from './Chef/pedido-activo/pedido-activo.component';
import {PedidosActivosSistemaComponent} from './Administrador/pedidos-activos-sistema/pedidos-activos-sistema.component';
import {TablaDePosicionesComponent} from './Administrador/tabla-de-posiciones/tabla-de-posiciones.component';
import {TomaDePedidosComponent} from './Chef/toma-de-pedidos/toma-de-pedidos.component';
import {ControlDePedidosComponent} from './Chef/control-de-pedidos/control-de-pedidos.component';
import {ReasignacionDePedidosComponent} from './Chef/reasignacion-de-pedidos/reasignacion-de-pedidos.component';
import {NavbarCheftComponent} from './Chef/navbar-cheft/navbar-cheft.component';
import {TablaDePosiciones2Component} from './Administrador/tabla-de-posiciones2/tabla-de-posiciones2.component';
import {TablaDePosiciones3Component} from './Administrador/tabla-de-posiciones3/tabla-de-posiciones3.component';
import {TablaDePosiciones4Component} from './Administrador/tabla-de-posiciones4/tabla-de-posiciones4.component';
import {FormUsuarioComponent} from './form-usuario/form-usuario.component';


export let rutas: Routes;
rutas = [
  {path: '', component: FormUsuarioComponent},
  {
    path: 'administrador', component: VistaAdministradorComponent,
    children: [
      {path: '', component: NavbarAdministradorComponent},
      {path: 'gestionMenu', component: GestionMenuComponent},
      {path: 'gestionPlatos', component: GestionTipoPlatoComponent},
      {path: 'pedidosActivos', component: PedidosActivosSistemaComponent},
      {path: 'top10MasVendido' , component: TablaDePosicionesComponent},
      {path: 'top10MasGanancias' , component: TablaDePosiciones2Component},
      {path: 'top10MejorFeedback', component: TablaDePosiciones3Component},
      {path: 'Top10Clientes' , component: TablaDePosiciones4Component},
      { path: '**', redirectTo: '' },
    ]
  },
  {path: 'chef', component: VistaChefComponent,
    children: [
      {path: '', component:  NavbarCheftComponent},
      {path: 'tomaPedidos', component: TomaDePedidosComponent},
      {path: 'pedidosActivos', component: PedidoActivoComponent},
      {path: 'controlPedidos', component: ControlDePedidosComponent},
      {path: 'reasignarPedidos', component: ReasignacionDePedidosComponent},
      { path: '**', redirectTo: '' },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
