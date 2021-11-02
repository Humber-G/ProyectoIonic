import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { IClient } from 'src/services/ICliente';

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
  constructor(service: ClienteService) {
    this.clientService = service;
  }

  sendSubmit() {
    if (this.client.age >= 18 && this.client.password === this.c_password) {
      this.clientService.addClient(this.client).subscribe((response) => {
        console.log(response);
      });
    }
    this.client.name = '';
    this.client.lastName = '';
    this.client.email = '';
    this.client.age = 0;
    this.client.password = '';
    this.c_password = '';
  }

  ngOnInit() {}
}
