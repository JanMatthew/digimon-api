import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { InfoComponent } from './info/info.component';
import { DigimonListComponent } from './buscador/digimon-list/digimon-list.component';
import { FavoritosComponent } from './buscador/favoritos/favoritos.component';
import {FormsModule} from '@angular/forms';
import { DigimonDetallesComponent } from './buscador/digimon-detalles/digimon-detalles.component';
import {LoginService} from './login.service';
import {UsersService} from './users.service';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'buscador', component: BuscadorComponent},
  {path: 'info',component: InfoComponent},
  {path: 'digimonlist', component: DigimonListComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'detalles/:name', component: DigimonDetallesComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BuscadorComponent,
    InfoComponent,
    DigimonListComponent,
    FavoritosComponent,
    DigimonDetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [LoginService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
