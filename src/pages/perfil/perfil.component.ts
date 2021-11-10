import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from 'src/services/ICliente';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'perfil-component',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(private client: HttpClient, private route: ActivatedRoute) {}

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
    });

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
        }
      },
      (err) => {
        alert('Algo salio mal mi rey');
      }
    );
  }
}
