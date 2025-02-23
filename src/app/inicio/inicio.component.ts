import { Component } from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-inicio',
  standalone: false,

  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  user = "";
  isDarkMode = false;
  logged = false;
  loginAbierto = false;
  constructor(protected login : LoginService) {
    this.logged = localStorage.getItem('logged') === 'true';
    if (this.logged) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    }
  }


  clickLogin(){
    this.loginAbierto = !this.loginAbierto;
  }

  iniciarSesion(user: string, pass: string) {
    const loginExitoso = this.login.login(user, pass);
    if (loginExitoso) {
      this.logged = true;  // Usuario autenticado
      this.loginAbierto = false; // Cerrar login
      localStorage.setItem('logged','true');
      this.user = user;
      location.reload();
    }

  }

}

