import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'perfil-component',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(private client: HttpClient) {}

  private url: string = 'http://localhost:3000/clientes';
  ngOnInit() {}
}
