import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Tab2Page } from "../tab2/tab2.page";
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  menu = []
  constructor(private router: Router,
    private dataService: DataService,
    public toastController: ToastController,
    public modalController: ModalController,
    private objetosService: ObjetosService) { this.menu = objetosService.getMenu()}

  

  agregarCarrito(plato) {
    //console.log(plato)
    this.dataService.setData(plato);
    this.presentToast(plato.plato);

  }

  // Toast display
  async presentToast(plato) {
    const toast = await this.toastController.create({
      message: plato + ' fue agregado :)',
      duration: 2000
    });
    toast.present();
  }

  // Modal display
  async presentModal() {
    const modal = await this.modalController.create({
      component: Tab2Page,
      componentProps:  {menu : this.dataService.getData()}
    });
    return await modal.present();
  }



}
