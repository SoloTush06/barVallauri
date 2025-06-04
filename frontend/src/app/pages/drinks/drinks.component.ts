import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarFoodComponent } from '../../components/sidebar-food/sidebar-food.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarFoodComponent]
})
export class DrinksComponent implements OnInit {
  menu: any[] = [];
  quantities: { [key: string]: number } = {};  
  carrelloQuantities: { [key: string]: number } = {}; 
  carrelloItems: any[] = []; 
  showSuccessAlert: boolean = false;
  popupVisible: boolean = false;
  messaggioErrore: string = '';
  carrello: any[] = [];  
  
  constructor(private http: HttpClient , private router: Router) {}
 
  ngOnInit(): void {
    this.caricaMenu();
  }

  caricaMenu(): void {
    this.http.get<any[]>('https://vallauribar.connectify.it/api/food/menu-bevande')
      .subscribe({
        next: (data) => {
          this.menu = data;
          this.menu.forEach(item => this.quantities[item.nome] = 0);
        },
        error: () => {
          this.messaggioErrore = 'Errore nel recupero del menu.';
        }
      });
  }

  incrementa(nome: string): void {
    this.quantities[nome] = (this.quantities[nome] || 0) + 1;
  }

  decrementa(nome: string): void {
    if (this.quantities[nome] > 1) {
      this.quantities[nome]--;
    } else {
      delete this.quantities[nome];
    }
  }

  rimuovi(nome: string): void {
    delete this.carrelloQuantities[nome];
  }

  aggiungiAlCarrello(): void {
    const carrello = this.menu
  .filter(item => this.quantities[item.nome] > 0)
  .map(item => ({
    nome: item.nome,
    quantita: this.quantities[item.nome],
    prezzo: item.prezzo  // aggiunto il prezzo
  }));

    if (!carrello.length) {
      this.messaggioErrore = "Nessun prodotto selezionato.";
      setTimeout(() => this.messaggioErrore = '', 2500);
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.messaggioErrore = "Errore: utente non autenticato.";
      return;
    }

    this.http.post('https://vallauribar.connectify.it/api/carrello', {
      email,
      carrello
    }).subscribe({
      next: () => {
        this.showSuccessAlert = true;
        this.resetQuantities(); 
        setTimeout(() => this.showSuccessAlert = false, 2500);
      },
      error: () => {
        this.messaggioErrore = "Errore nel salvataggio del carrello.";
      }
    });
  }

  togglePopup(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.messaggioErrore = "Errore: utente non autenticato.";
      return;
    }

    this.http.get<any>(`https://vallauribar.connectify.it/api/carrello/${email}`)
      .subscribe({
        next: (response) => {
          this.carrelloItems = response.carrello || [];
          this.carrelloItems.forEach(item => {
            this.carrelloQuantities[item.nome] = item.quantita;
          });
          this.popupVisible = true;
        },
        error: () => {
          this.messaggioErrore = "Carrello vuoto o errore nel caricamento.";
          setTimeout(() => this.messaggioErrore = '', 2500);
        }
      });
  }

  incrementaCarrello(nome: string): void {
    this.http.put(`https://vallauribar.connectify.it/api/carrello/incrementa`, { email: localStorage.getItem('email'), nome })
      .subscribe({
        next: () => {
          this.caricaCarrello(); 
        },
        error: () => {
          this.messaggioErrore = "Errore nell'aggiornamento del carrello.";
        }
      });
  }
  
  decrementaCarrello(nome: string): void {
    this.http.put(`https://vallauribar.connectify.it/api/carrello/decrementa`, { email: localStorage.getItem('email'), nome })
      .subscribe({
        next: () => {
          this.caricaCarrello(); 
        },
        error: () => {
          this.messaggioErrore = "Errore nell'aggiornamento del carrello.";
        }
      });
  }

  rimuoviCarrello(nome: string): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.messaggioErrore = "Errore: utente non autenticato.";
      return;
    }
  
    this.http.request('delete', `https://vallauribar.connectify.it/api/carrello/rimuovi`, {
      body: { email, nome }
    }).subscribe({
      next: () => {
        this.caricaCarrello();
      },
      error: () => {
        this.messaggioErrore = "Errore nella rimozione del prodotto dal carrello.";
      }
    });
  }
  
  vaiAlCarrello(): void {
    if (!this.carrelloItems.length) {
      this.messaggioErrore = "Il carrello è vuoto. Non puoi procedere all'acquisto.";
      setTimeout(() => this.messaggioErrore = '', 2500);
      return;
    }
    
    this.popupVisible = false;
    this.router.navigate(['/Acquisto']);
  }

  private resetQuantities(): void {
    this.menu.forEach(item => this.quantities[item.nome] = 0);
  }

  caricaCarrello(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.messaggioErrore = "Errore: utente non autenticato.";
      return;
    }
  
    this.http.get(`https://vallauribar.connectify.it/api/carrello/${email}`)
      .subscribe({
        next: (response: any) => {
          this.carrello = response.carrello;
          this.carrelloItems = response.carrello || []; 
          this.carrelloQuantities = {};                 
          this.carrelloItems.forEach(item => {
            this.carrelloQuantities[item.nome] = item.quantita;
          });
        },
        error: () => {
          this.messaggioErrore = "Errore nel recupero del carrello.";
        }
      });
  }
}
