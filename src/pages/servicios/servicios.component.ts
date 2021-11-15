import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'servicios-component',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  constructor(private client: HttpClient, private alertCtrl: AlertController) {}

  private url: string = 'http://192.168.101.7:3000/cuts';

  name: string;
  price: string;
  time: string;
  cortes: [];

  ngOnInit() {
    this.client.get<any>(this.url).subscribe((response) => {
      this.cortes = response;
      if (!this.cortes) {
        this.alertCtrl
          .create({
            header: 'Error',
            message:
              'No hay cortes registrados en la BD o el servidor no está andando, F.',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      }
    });
  }
}
