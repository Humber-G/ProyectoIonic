import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  private url: string = 'http://localhost:3000/clientes';
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
          alert('Bienvenido');
          this.loginForm.reset();
          this.router.navigate(['']);
        } else {
          alert('Usuario no Encontrado');
        }
      },
      (err) => {
        alert('Algo salio mal mi rey');
      }
    );
  }
}
