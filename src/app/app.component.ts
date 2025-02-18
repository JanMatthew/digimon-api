import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isPerfilMenuOpen = false;
  isDarkMode = false;
  title = 'digimonAPI';
  logged = false;

  constructor(private router: Router) {
    this.logged = localStorage.getItem('logged') === 'true'; //Comprueba si esta logeado
    if (this.logged) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'enabled'; //Comprueba el tema
    }
  }

  menuPerfil(){
    this.isPerfilMenuOpen = !this.isPerfilMenuOpen;
  }
  cerrarSesion(){
    this.logged = false;
    localStorage.setItem('logged','false');
    this.isDarkMode = false;
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
    location.reload();
    localStorage.setItem('favs', "");
  }
  changeTheme(){
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
    location.reload();
  }
}
