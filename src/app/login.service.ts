import { Injectable } from '@angular/core';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private servicio: UsersService) {
  }
  login(user:string, pass:string){
    let logged = false;
    const users = this.servicio.passData();
    for (let i=0; i<users.length; i++) {
      if (users[i].username == user){
        if(users[i].password == pass){
          alert("Se ha iniciado sesion correctamente");
          return true;
        }
        else{
          alert("Contraseña incorrecta");
          return false;
        }
      }
    }
    alert("No se ha encontrado ese usuario");
    return false;


  }

}
