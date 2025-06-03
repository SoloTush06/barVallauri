import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-classifica-mensile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './classifica-mensile.component.html',
  styleUrl: './classifica-mensile.component.css'
})
export class ClassificaMensileComponent  implements OnInit {
  classifica: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://109.123.240.145:3000/classifica-mensile')
      .subscribe({
        next: data => this.classifica = data,
        error: err => console.error(err)
      });
  }
}
