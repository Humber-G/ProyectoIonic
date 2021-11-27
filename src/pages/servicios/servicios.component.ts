import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/services/cart.service';
import { CartModalComponent } from 'src/pages/cart-modal/cart-modal.component';

@Component({
  selector: 'servicios-component',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  constructor(
    private client: HttpClient,
    private alertCtrl: AlertController,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  private url: string = 'http://192.168.101.6:3000/cuts';
  cart = [];
  products = null;
  cartItemCount: BehaviorSubject<number>;

  name: string;
  price: string;
  time: string;
  cortes: [];

  ngOnInit() {
    this.client.get<any>(this.url).subscribe((response) => {
      this.cortes = response;
      if (!this.cortes) {
        this.alertCtrl
          .create({
            header: 'Error',
            message:
              'No hay cortes registrados en la BD o el servidor no está andando, F.',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      }
    });

    //carro

    //getProducts
    this.products = this.cartService.getProducts().subscribe((todos) => {});

    //getCart
    this.cart = this.cartService.getCart();

    //getCount
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  async openCart() {
    let modal = await this.modalCtrl.create({
      component: CartModalComponent,
      cssClass: 'cart-modal',
    });
    modal.present();
  }
}
