import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FoodComponent } from './pages/food/food.component';

export const routes: Routes = [
    {
      path: "",
      component: HomeComponent,
    },
    {
      path: "menu",
      component: MenuComponent,
    },
    {
      path: "food",
      component: FoodComponent,
    },
    {
        path: "**",
        component: NotFoundComponent,
    }
];
  