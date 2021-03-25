import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VistaAdministradorComponent} from './Administrador/vista-administrador/vista-administrador.component';
import {VistaChefComponent} from './Chef/vista-chef/vista-chef.component';
import {FormUsuarioComponent} from './form-usuario/form-usuario.component';
import {NavbarChefComponent} from './Chef/navbar-chef/navbar-chef.component';
import {ControlPedidoComponent} from './Chef/control-pedido/control-pedido.component';
import {TomaDePedidosComponent} from './Chef/toma-de-pedidos/toma-de-pedidos.component';
import {PedidosEnElSistemaComponent} from './Chef/pedidos-en-el-sistema/pedidos-en-el-sistema.component';
import {ReasignacionDePedidosComponent} from './Chef/reasignacion-de-pedidos/reasignacion-de-pedidos.component';
import {NavbarAdministradorComponent} from './Administrador/navbar-administrador/navbar-administrador.component';
import {PedidosSistemaAdmiComponent} from './Administrador/pedidos-sistema-admi/pedidos-sistema-admi.component';
import {GestionDeTipoDePlatosComponent} from './Administrador/gestion-de-tipo-de-platos/gestion-de-tipo-de-platos.component';
import {GestionDelMenuComponent} from './Administrador/gestion-del-menu/gestion-del-menu.component';
import {Top10MasVendidosComponent} from './Administrador/top10-mas-vendidos/top10-mas-vendidos.component';


export let rutas: Routes;
rutas = [
  {path: '', component: FormUsuarioComponent},
  {
    path: 'administrador', component: VistaAdministradorComponent,
    children: [
      {path: '', component: NavbarAdministradorComponent},
      {path: 'pedidosSistema', component: PedidosSistemaAdmiComponent},
      {path: 'getionDePlatos' , component: GestionDeTipoDePlatosComponent},
      {path: 'gestionMenu', component: GestionDelMenuComponent},
      {path: 'top10MasVendidos' , component: Top10MasVendidosComponent},
      { path: '**', redirectTo: '' },
    ]
  },
  {path: 'chef', component: VistaChefComponent,
    children: [
      {path: '', component:  NavbarChefComponent},
      {path: 'pedidosSistema', component: PedidosEnElSistemaComponent},
      {path: 'controlPedido', component: ControlPedidoComponent},
      {path: 'tomaPedido', component: TomaDePedidosComponent},
      {path: 'reasignarPedido' , component: ReasignacionDePedidosComponent},
      { path: '**', redirectTo: '' },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
