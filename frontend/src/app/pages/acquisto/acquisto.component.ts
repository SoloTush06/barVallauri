import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CartItem {
  nome: string;
  prezzo: number;
  quantita: number;
}

@Component({
  selector: 'app-acquisto',
  standalone: true,
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.css'],
  imports: [CommonModule]
})
export class AcquistoComponent implements OnInit {
  cartItems: CartItem[] = [];
  messaggioErrore: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.messaggioErrore = "Errore: utente non autenticato.";
      return;
    }

    this.http.get<any>(`https://vallauribar.connectify.it/api/carrello/${email}`)
      .subscribe({
        next: (response) => {
          this.cartItems = response.carrello || [];
        },
        error: () => {
          this.messaggioErrore = "Errore nel caricamento del carrello.";
        }
      });
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantita, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.prezzo * item.quantita), 0);
  }

  confirmOrder(): void {
    if (this.cartItems.length === 0) {
      this.messaggioErrore = 'Il carrello è vuoto.';
      setTimeout(() => this.messaggioErrore = '', 2500);
      return;
    }

    const codiceOrdine = this.generateOrderCode();
    const email = localStorage.getItem('email');
    const totale = this.getTotalPrice();

    if (!email) {
      this.messaggioErrore = "Errore: email non trovata.";
      return;
    }

    this.http.post('https://vallauribar.connectify.it/api/ordini/aggiungi', {
      email,
      cartItems: this.cartItems,
      totale,
      codiceOrdine
    }).subscribe({
      next: () => {
        this.http.post('https://vallauribar.connectify.it/api/ordini/email-in-attesa', {
          email,
          codiceOrdine
        }).subscribe({
          next: () => {
            alert(`Ordine confermato! Codice ordine: ${codiceOrdine}`);
            this.cartItems = []; 
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.messaggioErrore = "Errore nell'invio dell'email di conferma.";
            setTimeout(() => this.messaggioErrore = '', 2500);
          }
        });
      },
      error: () => {
        this.messaggioErrore = "Errore nella conferma dell'ordine.";
        setTimeout(() => this.messaggioErrore = '', 2500);
      }
    });
  }

  generateOrderCode(): string {
    return 'ORD' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
