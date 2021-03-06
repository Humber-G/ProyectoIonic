import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/services/cart.service';
import { ICompra } from 'src/services/ICompra';
import { IProducto } from 'src/services/IProducto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cart: IProducto[] = [];
  customDayShortNames = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private compra: ICompra = {
    productos: '',
    cantidad: 0,
    total: 0,
    idcomprador: 1,
    fechaRealizada: Date.now(),
    fechaSeleccionada: null,
    hora: null,
  };

  checkout() {
    // this.cartService.sendOrder(this.compra).subscribe((response) => {
    //   console.log(response);
    // });
    Swal.fire({
      icon: 'success',
      title: 'Servicio Agendado',
      showConfirmButton: false,
      timer: 1500,
    }),
      this.cartService.blankCart();
    this.compra.fechaSeleccionada = null;
    this.compra.hora = null;
    this.close();
  }
}
