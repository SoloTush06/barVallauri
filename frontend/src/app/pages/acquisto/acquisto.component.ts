import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-acquisto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acquisto.component.html',
  styleUrl: './acquisto.component.css'
})

export class AcquistoComponent implements OnInit {
  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  confirmOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Il carrello è vuoto.');
      return;
    }

    // Logica di conferma ordine
    alert('Ordine confermato!');
    
    // Svuoto il carrello dopo conferma
    this.cartItems = [];
    localStorage.removeItem('cart');
  }
}