import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  private url: string = 'http://54.227.209.116:3000/clientes';

  login() {
    this.client.get<any>(this.url).subscribe(
      (response) => {
        const user = response.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.alertCtrl
            .create({
              header: 'Inicio de sesión exitoso',
              message: 'Bienvenido mi king, Pase nomas con confianza.',
              buttons: [
                {
                  text: 'Dele mi rey',
                  handler: () => {
                    this.router.navigate(['perfil/' + user.id]);
                  },
                },
              ],
            })
            .then((alert) => alert.present());
          this.loginForm.reset();
        } else {
          this.alertCtrl
            .create({
              header: 'Algo salio mal mi rey',
              message: 'Datos Incompletos O Erroneos, Pal Lobby',
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          this.loginForm.reset();
        }
      },
      (err) => {
        alert('Algo salio mal mi rey');
      }
    );
  }
}
