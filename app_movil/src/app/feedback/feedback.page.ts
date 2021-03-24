import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  @Input() platos;
  @ViewChild(IonRange) calificacion: IonRange;

  
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
    console.log(this.calificacion.value);
  }
  

}
