import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  pedidosMuestra = [
    {
      menu: 'Lentejas con plátano maduro',
      fecha: '3 de marzo',
      chef: 'Juan Carlos',
      estado: 'Preparando',
      tiempo_transcurrido: '1min',
      tiempo_estimado: '5min'
    },
    {
      menu: 'Sopa azteca',
      fecha: '1 de marzo',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    },
    {
      menu: 'Cereal con leche',
      fecha: '28 de febrero',
      chef: 'Pipe',
      estado: 'Preparado',
      tiempo_transcurrido: '1,5min',
      tiempo_estimado: '5min'
    }
  ]
}
