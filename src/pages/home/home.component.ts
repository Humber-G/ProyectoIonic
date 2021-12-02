import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private client: HttpClient, private alertCtrl: AlertController) {}

  private url: string = 'http://54.227.209.116:3000/cuts';

  name: string;
  price: string;
  time: string;
  description: string;
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
      console.error();
    });
  }
}
