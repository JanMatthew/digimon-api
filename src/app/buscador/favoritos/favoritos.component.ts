import { Component } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  standalone: false,

  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  favsList:{ name: string; img: string }[] = [];
  isDarkMode: boolean = false;
  ngOnInit() {
    this.actualizarFavs();
    this.isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  }

  async actualizarFavs() {
    const favorites = JSON.parse(<string>localStorage.getItem('favs')) || [];
    this.favsList = [];
    for (const f of favorites) {
      const result = await fetch('https://digi-api.com/api/v1/digimon/' + f);
      const data = await result.json();
      console.log(data)
      this.favsList.push({name: f,img: data['images'][0]['href']});
    }
  }

  eliminarFav(digimonName: string) {
    let favs = JSON.parse(<string>localStorage.getItem('favs')) || [];
    favs = favs.filter((fav: string) => fav !== digimonName);
    this.favsList = favs;
    localStorage.setItem('favs', JSON.stringify(favs));
    this.actualizarFavs();
  }
}
