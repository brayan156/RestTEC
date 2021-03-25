import { NgModule } from '@angular/core';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import {VistaAdministradorComponent} from './Administrador/vista-administrador/vista-administrador.component';
import {NavbarAdministradorComponent} from './Administrador/navbar-administrador/navbar-administrador.component';
import {AppComponent} from './appcomponet/app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, rutas} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavbarChefComponent } from './Chef/navbar-chef/navbar-chef.component';
import { VistaChefComponent } from './Chef/vista-chef/vista-chef.component';
import { TomaDePedidosComponent } from './Chef/toma-de-pedidos/toma-de-pedidos.component';
import { ControlPedidoComponent } from './Chef/control-pedido/control-pedido.component';
import { PedidosEnElSistemaComponent } from './Chef/pedidos-en-el-sistema/pedidos-en-el-sistema.component';
import { ReasignacionDePedidosComponent } from './Chef/reasignacion-de-pedidos/reasignacion-de-pedidos.component';
import { PedidosSistemaAdmiComponent } from './Administrador/pedidos-sistema-admi/pedidos-sistema-admi.component';
import { GestionDeTipoDePlatosComponent } from './Administrador/gestion-de-tipo-de-platos/gestion-de-tipo-de-platos.component';
import { GestionDelMenuComponent } from './Administrador/gestion-del-menu/gestion-del-menu.component';
import { Top10MasVendidosComponent } from './Administrador/top10-mas-vendidos/top10-mas-vendidos.component';

// @ts-ignore
@NgModule({
  declarations: [
    FormUsuarioComponent,
    NavbarAdministradorComponent,
    NavbarChefComponent,
    AppComponent,
    VistaAdministradorComponent,
    VistaChefComponent,
    NavbarChefComponent,
    TomaDePedidosComponent,
    ControlPedidoComponent,
    PedidosEnElSistemaComponent,
    ReasignacionDePedidosComponent,
    PedidosSistemaAdmiComponent,
    GestionDeTipoDePlatosComponent,
    GestionDelMenuComponent,
    Top10MasVendidosComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
