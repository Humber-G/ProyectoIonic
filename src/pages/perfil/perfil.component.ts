import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from 'src/services/ICliente';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'perfil-component',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(
    private client: HttpClient,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private service: ClienteService
  ) {}

  private url: string = 'http://localhost:3000/clientes';
  public selectedClient: IClient;

  selectedId: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.selectedId = +params.get('id');

      this.client.get<any>(this.url).subscribe(
        (response) => {
          const user = response.find((a: any) => {
            return a.id === this.selectedId;
          });
          if (user) {
            this.nombre = user.name;
            this.apellido = user.lastName;
            this.email = user.email;
            this.edad = user.age;
          } else {
            this.alertCtrl
              .create({
                header: 'Algo salio mal mi rey',
                message:
                  'El ID no se ha encontrado o el servidor esta inactivo, Pal Lobby',
                buttons: ['OK'],
              })
              .then((alert) => alert.present());
          }
        },
        (err) => {
          alert('ERROR');
        }
      );
    });
  }

  deleteClient() {
    let alert = this.alertCtrl
      .create({
        header: 'Eliminar Usuario',
        message:
          'En serio deseas Borrar tu usuario? Este paso es irreversible.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Confirmar',
            handler: () => {
              this.client.get<any>(this.url).subscribe((response) => {
                const user = response.find((a: any) => {
                  return a.id === this.selectedId;
                });
                if (user) {
                  this.service
                    .deleteClient(this.selectedId)
                    .subscribe((response) => {});
                  window.location.reload();
                } else {
                  this.alertCtrl
                    .create({
                      header: 'Error',
                      message:
                        'El ID no se ha encontrado o el servidor esta inactivo, Pal Lobby',
                      buttons: ['OK'],
                    })
                    .then((alert) => alert.present());
                }
              });
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  patchClient() {}
}
