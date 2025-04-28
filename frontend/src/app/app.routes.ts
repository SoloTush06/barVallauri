
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FoodComponent } from './pages/food/food.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformazioniProfiloComponent } from './pages/informazioni-profilo/informazioni-profilo.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { AuthGuard } from './auth.guard'; // Importa la guardia
import { AcquistoComponent } from './pages/acquisto/acquisto.component';
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: HomeComponent,
  },
  {
    path: "menu",
    component: MenuComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "food",
    component: FoodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "Acquisto",
    component: AcquistoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"informazioniProfilo",
    component: InformazioniProfiloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profilo",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bibite",
    component: DrinksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];
