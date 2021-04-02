import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VistaAdministradorComponent} from './Administrador/vista-administrador/vista-administrador.component';
import {VistaChefComponent} from './Chef/vista-chef/vista-chef.component';
import {FormUsuarioComponent} from './form-usuario/form-usuario.component';
import {NavbarChefComponent} from './Chef/navbar-chef/navbar-chef.component';
import {ControlPedidoComponent} from './Chef/control-pedido/control-pedido.component';
import {TomaDePedidosComponent} from './Chef/toma-de-pedidos/toma-de-pedidos.component';
import {ReasignacionDePedidosComponent} from './Chef/reasignacion-de-pedidos/reasignacion-de-pedidos.component';
import {NavbarAdministradorComponent} from './Administrador/navbar-administrador/navbar-administrador.component';
import {PedidosSistemaAdmiComponent} from './Administrador/pedidos-sistema-admi/pedidos-sistema-admi.component';
import {GestionDeTipoDePlatosComponent} from './Administrador/gestion-de-tipo-de-platos/gestion-de-tipo-de-platos.component';
import {GestionDelMenuComponent} from './Administrador/gestion-del-menu/gestion-del-menu.component';
import {Top10MasVendidosComponent} from './Administrador/top10-mas-vendidos/top10-mas-vendidos.component';
import {Top10masGananciasComponent} from './Administrador/top10mas-ganancias/top10mas-ganancias.component';
import {Top10FeedbackComponent} from './Administrador/top10-feedback/top10-feedback.component';
import {Top10mejoresClientesComponent} from './Administrador/top10mejores-clientes/top10mejores-clientes.component';
import {PedidosEnElSistemaComponent} from './Chef/pedidos-en-el-sistema/pedidos-en-el-sistema.component';


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
      {path: 'top10MasGanancias', component: Top10masGananciasComponent},
      {path: 'top10MejorFeedback' , component: Top10FeedbackComponent},
      {path: 'top10MejoresClientes', component: Top10mejoresClientesComponent},
      { path: '**', redirectTo: '' },
    ]
  },
  {path: 'chef', component: VistaChefComponent,
    children: [
      {path: '', component:  NavbarChefComponent},
      {path: 'controlPedido', component: ControlPedidoComponent},
      {path: 'tomaPedido', component: TomaDePedidosComponent},
      {path: 'pedidosSistema' , component: PedidosEnElSistemaComponent},
      {path: 'reasignarPedido' , component: ReasignacionDePedidosComponent},
      { path: '**', redirectTo: '' },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
