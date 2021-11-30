import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducto } from 'src/services/IProducto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:3000/cuts';
  private httpClient: HttpClient;
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  getProducts() {
    return this.httpClient.get<IProducto[]>(this.url);
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  //Funciones para el carro
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id == product.id) {
        p.amount -= 1;

        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
  blankCart() {
    for (let [index, p] of this.cart.entries()) {
      this.cartItemCount.next(this.cartItemCount.value - this.cartItemCount.value)
      this.cart.splice(index, 1)
    }
  }
}
