import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { IClient } from 'src/services/ICliente';
import { Router } from '@angular/router';

@Component({
  selector: 'registro-component',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public client: IClient = {
    name: '',
    lastName: '',
    email: '',
    age: 0,
    password: '',
  };

  public c_password: '';

  private clientService: ClienteService;
  constructor(service: ClienteService, private router: Router) {
    this.clientService = service;
  }
  private status: boolean = false;
  sendSubmit() {
    if (this.client.age >= 18 && this.client.password === this.c_password) {
      this.clientService.addClient(this.client).subscribe((response) => {
        console.log(response);
      });
      alert('Registrado Exitosamente');

      this.status = true;
    } else {
      alert('Error Ingresa tus datos nuevamente');
      this.status = false;

      this.client.name = '';
      this.client.lastName = '';
      this.client.email = '';
      this.client.age = 0;
      this.client.password = '';
      this.c_password = '';
    }

    if (this.status === true) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {}
}
