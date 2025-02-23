import { Component } from '@angular/core';

@Component({
  selector: 'app-digimon-list',
  standalone: false,

  templateUrl: './digimon-list.component.html',
  styleUrl: './digimon-list.component.css'
})
export class DigimonListComponent {
  favsList:{ name: string; img: string }[] = [];
  prevDisabled = true;
  nextDisabled = false;
  index = 1;
  digimons:{name:string,img:string,digiFav:string}[] = []
  ngOnInit() {
    this.actualizarFavs().then( () =>{
      this.listarDigimons();
    });
  }
  prevPage(){
    this.index--;
    this.listarDigimons()
    this.nextDisabled = false;

  }
  async nextPage(){

    this.index++;
    this.listarDigimons();
    this.prevDisabled = false;
    const result = await fetch('https://digi-api.com/api/v1/digimon');
    const data = await result.json();

  }
  async listarDigimons() {
    this.nextDisabled = true;
    this.prevDisabled = true;
    this.digimons = []
    const result = await fetch('https://digi-api.com/api/v1/digimon?page=' + this.index);
    const data = await result.json();
    for (let i = 0; i < data['content'].length; i++) {
      let digiFav = "Añadir a Favoritos"
      if (this.favsList.some(fav => fav.name === data['content'][i]['name'])) {
        digiFav = "Eliminar de Favoritos";
      }
      const newDigimon = {name: data['content'][i]['name'], img: data['content'][i]['image'], digiFav: digiFav};
      this.digimons.push(newDigimon);
    }
    if (this.index != 1){
      this.prevDisabled = false;
    }
    if (this.index + 1 <= data['pageable']['totalPages']){
      this.nextDisabled = false
    }

  }

  aynadirFav(digimonName:string){
    let favs = JSON.parse(<string>localStorage.getItem('favs')) || [];
    if (favs.includes(digimonName)){
      favs = favs.filter((fav: string) => fav !== digimonName);
      this.digimons = this.digimons.map(digi =>
        digi.name === digimonName ? { ...digi, digiFav: "Añadir a Favoritos" } : digi
      );
    }
    else{
      favs.push(digimonName);
      this.digimons = this.digimons.map(digi =>
        digi.name === digimonName ? { ...digi, digiFav: "Eliminar de Favoritos" } : digi
      );
    }
    this.favsList = favs;
    localStorage.setItem('favs', JSON.stringify(favs));

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
}
