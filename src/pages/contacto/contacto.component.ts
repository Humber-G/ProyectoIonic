import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'contacto-component',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private client: HttpClient, private alertCtrl: AlertController) { }

  private url: string = 'http://localhost:3000/personal';

  nombre: string;
  apellido: string;
  mail: string;
  telefono: number;

  workers: [];
  ngOnInit() {
    this.client.get<any>(this.url).subscribe((response) => {
      // console.log(response);

      this.workers = response;
      if (!this.workers) {
        this.alertCtrl
          .create({
            header: 'Algo salio mal mi rey',
            message:
              'No hay Trabajadores ingresados en la BD o el servidor esta inactivo, Pal Lobby',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      }
    });
  }
}
