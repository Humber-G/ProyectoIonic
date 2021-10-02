import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/pages/home/home.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { ServiciosComponent } from 'src/pages/servicios/servicios.component';
import { PerfilComponent } from 'src/pages/perfil/perfil.component';
import { RegistroComponent } from 'src/pages/registro/registro.component';
import { ContactComponent } from 'src/pages/contacto/contacto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path : 'home',
    component : HomeComponent
  },

  {
    path : 'login',
    component : LoginComponent
  },

  {
    path : 'servicios',
    component : ServiciosComponent
  },

  {
    path : 'perfil',
    component : PerfilComponent
  },

  {
    path : 'registro',
    component : RegistroComponent
  },

  {
    path : "contacto",
    component : ContactComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
