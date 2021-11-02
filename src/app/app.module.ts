import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from 'src/pages/home/home.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { ServiciosComponent } from 'src/pages/servicios/servicios.component';
import { PerfilComponent } from 'src/pages/perfil/perfil.component';
import { RegistroComponent } from 'src/pages/registro/registro.component';
import { ContactComponent } from 'src/pages/contacto/contacto.component';
import { ClienteService } from '../services/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ServiciosComponent,
    PerfilComponent,
    RegistroComponent,
    ContactComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ClienteService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
