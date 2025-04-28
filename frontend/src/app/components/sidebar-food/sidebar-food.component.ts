import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-food',
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar-food.component.html',
  styleUrl: './sidebar-food.component.css'
})
export class SidebarFoodComponent {
  isCollapsed: boolean = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
