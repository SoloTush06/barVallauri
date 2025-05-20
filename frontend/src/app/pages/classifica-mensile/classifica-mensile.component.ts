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
    this.http.get<any[]>('https://friendly-barnacle-9px9jq69454fprpg-3000.app.github.dev/classifica-mensile')
      .subscribe({
        next: data => this.classifica = data,
        error: err => console.error(err)
      });
  }
}
