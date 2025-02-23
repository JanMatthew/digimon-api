import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-digimon-detalles',
  standalone: false,

  templateUrl: './digimon-detalles.component.html',
  styleUrl: './digimon-detalles.component.css'
})
export class DigimonDetallesComponent {
  isDarkMode = false;
  anyadir = "Añadir a Favoritos";
  digivice = {}
  digimonImg = ""
  digimonName = ""
  digimonLevel = ""
  digimonAttribute = ""
  digimonType = "";
  index = 1;
  fields: { name: string; img: string }[] = [];
  favsList:{ name: string; img: string }[] = [];
  fondoNegro = false;


  constructor(private route: ActivatedRoute) {

    this.digimonName = this.route.snapshot.params['name'];
    this.isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  }

  ngOnInit() {
    this.actualizarFavs().then(() => {
      this.buscarDigimon(this.digimonName)
    });
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

  async buscarDigimon(digimon: string) {
    this.fields = []
    this.digivice = {}
    this.digimonImg = ""
    this.digimonLevel = ""
    this.digimonAttribute = ""
    this.digimonType = ""
        const result = await fetch('https://digi-api.com/api/v1/digimon/' + digimon)
        if (result.ok) {
          const data = await result.json();
          if (this.favsList.some(fav => fav.name === data['name'])) {
            this.anyadir = "Eliminar Digimon de Favoritos";
          }
          this.digimonImg = data['images'][0]['href'];
          this.digivice = {'background-image': 'url(' + this.digimonImg + ')'};
          this.digimonLevel = data['levels'][0]['level']
          data['attributes'].forEach((attribute: any) => {
            this.digimonAttribute += (attribute['attribute']) + " "; // Muestra cada atributo en la consola
          });
          data['types'].forEach((type: any) => {
            this.digimonType += (type['type']) + " ";
          });
          data['fields'].forEach((field: any) => {
            const newField = {name: field['field'], img: field['image']};
            this.fields.push(newField);
          })
        } else {
          alert("Digimon inexistente")
        }
  }
  aynadirFav(){
    let favs = JSON.parse(<string>localStorage.getItem('favs')) || [];

    if (favs.includes(this.digimonName)){
      // Elimina el Digimon si ya está en favoritos
      favs = favs.filter((fav: string) => fav !== this.digimonName);
      this.anyadir = "Añadir a Favoritos";
    }
    else {
      if (favs.length >= 20) {
        alert("Has alcanzado el número máximo de 20 favoritos.");
        return; // Evita que se agregue más de 20
      }
      favs.push(this.digimonName);
      this.anyadir = "Eliminar Digimon de Favoritos";
    }

    this.favsList = favs;
    localStorage.setItem('favs', JSON.stringify(favs));
    this.actualizarFavs();
  }

  aplicarEfecto() {
    this.fondoNegro = true;
    this.digivice = {
      ...this.digivice,
      position:'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%) scale(1.5)',
      zIndex: '100'
    };
  }
  quitarEfecto() {
    this.fondoNegro = false;
    this.digivice = {
      ...this.digivice,
      position: undefined,
      left: undefined,
      top: undefined,
      transform: undefined,
      zIndex: undefined
    };
  }
}
