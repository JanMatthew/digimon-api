import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  users = [
    {
    username: "user1",
    password: "12345678",
    darkMode: false
    },
    {
     username: "user2",
     password: "12345678",
     darkMode: false
    },
    {
      username: "user3",
      password: "12345678",
      darkMode: false
    }]

  passData (){
    return this.users
  }
}
