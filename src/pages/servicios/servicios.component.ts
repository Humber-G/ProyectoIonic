import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/services/cart.service';
import { CartModalComponent } from 'src/pages/cart-modal/cart-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'servicios-component',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private client: HttpClient,
    private alertCtrl: AlertController,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  private url: string = 'http://54.227.209.116:3000/cuts';
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
    this.animateCSS('animate__tada');
    this.cartService.addProduct(product);
  }

  async openCart() {
    this.animateCSS('animate__bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: CartModalComponent,
      cssClass: 'cart-modal',
    });

    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove(
        'animate__animated',
        'animate__bounceOutLeft'
      );
      this.animateCSS('animate__bounceInLeft');
    });

    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animate__animated', animationName);

    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animate__animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
