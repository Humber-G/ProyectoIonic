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

  private url: string = 'http://192.168.101.7:3000/clientes';
  public selectedClient: IClient;

  selectedId: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  private password: string;

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
            this.password = user.password;
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
          alert(err);
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

  updateClient() {
    this.alertCtrl
      .create({
        header: 'Modificar datos',
        inputs: [
          {
            name: 'name',
            placeholder: 'Nombre:',
          },
          {
            name: 'lastName',
            placeholder: 'Apellido:',
          },
          {
            name: 'email',
            placeholder: 'Email:',
            type: 'email',
          },
          {
            name: 'age',
            placeholder: 'Edad:',
            min: 0,
            max: 100,
            type: 'number',
          },
          {
            name: 'password',
            placeholder: 'Contraseña:',
            type: 'password',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Confirmar',
            handler: (res) => {
              //Validaciones para realizar el patch sin dejar campos en blanco

              if (res.name == '') {
                res.name = this.nombre;
              } else {
                res.name;
              }

              if (res.lastName == '') {
                res.lastName = this.apellido;
              } else {
                res.lastName;
              }

              if (res.email == '') {
                res.email = this.email;
              } else {
                res.email;
              }

              if (!res.age) {
                res.age = this.edad;
              } else {
                res.age;
              }

              if (res.password == '') {
                res.password = this.password;
              } else {
                res.password;
              }

              var newData: IClient = {
                name: res.name,
                lastName: res.lastName,
                email: res.email,
                age: res.age,
                password: res.password,
              };

              this.service
                .updateClient(this.selectedId, newData)
                .subscribe((response) => {
                  window.location.reload();
                });
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
