import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StoreComponent } from './store/store.component';
import { LibraryComponent } from './library/library.component';
import { GameComponent } from './game/game.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent},
  {path: '', children:[
    {path: '', component: HeaderComponent, outlet: 'header'},
    {path: 'login', component: LoginComponent},
    {path: 'store', children: [
      {path: '', component: StoreComponent},
      {path: 'cart', component: CartComponent},
      {path: ':id', component: GameComponent}
    ]},
    {path: 'library', component: LibraryComponent},
    {path: '', component: FooterComponent, outlet: 'footer'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
