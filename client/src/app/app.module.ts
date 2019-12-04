import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { LibraryComponent } from './library/library.component';
import { LandingComponent } from './landing/landing.component';
import { GameComponent } from './game/game.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddGameComponent } from './add-game/add-game.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    LibraryComponent,
    LandingComponent,
    GameComponent,
    CartComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AddGameComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
