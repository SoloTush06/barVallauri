import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informazioni-profilo',
  imports: [],
  templateUrl: './informazioni-profilo.component.html',
  styleUrl: './informazioni-profilo.component.css'
})
export class InformazioniProfiloComponent implements OnInit {
  nome: string = '';
  cognome: string = '';
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('nome') || '';
    this.cognome = localStorage.getItem('cognome') || '';
    this.email = localStorage.getItem('email') || '';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}