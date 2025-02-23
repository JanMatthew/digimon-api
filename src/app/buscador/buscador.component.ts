import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  standalone: false,

  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {
  isDarkMode = false;

  pages = false;
  pageSize = 10;
  prevDisabled = true;
  nextDisabled = true;
  anyadir = "Añadir a Favoritos";
  buscarDis = false;
  buscar = "🔍 Buscar";
  tipoSearch = "text";
  placeholderSearch = "Nombre o numero del Digimon";
  filtroActivo = false;
  digimonFondo = {}
  digimonImg = ""
  digimonName = ""
  digimonLevel = ""
  digimonAttribute = ""
  digimonType = "";
  index = 0;
  fields: { name: string; img: string }[] = [];
  favsList:{ name: string; img: string }[] = [];
  digimons:{name:string; img:string,fav:string}[] = [];
  atributos:{nombre:string}[] = [];
  atributoSeleccionado: any;

  ngOnInit() {
    this.actualizarFavs();
    this.getAtributos();
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



  aynadirFav(digimon: string) {
    const favsRaw = localStorage.getItem('favs');
    let favs = [];

    if (favsRaw && favsRaw.trim() !== '') {
      try {
        favs = JSON.parse(favsRaw);
      } catch (e) {
        console.error('Error al parsear favoritos, se reiniciará la lista.', e);
        favs = [];
      }
    }

    if (favs.includes(digimon)) {
      // Elimina el Digimon si ya está en favoritos
      favs = favs.filter((fav: string) => fav !== digimon);
      this.digimons.forEach(item => {
        if (item.name === digimon) {
          item.fav = "Añadir a Favoritos";
        }
      });
    } else {
      if (favs.length >= 20) {
        alert("Has alcanzado el número máximo de 20 favoritos.");
        return; // Evita que se agregue más de 20
      }
      favs.push(digimon);
      this.digimons.forEach(item => {
        if (item.name === digimon) {
          item.fav = "Eliminar de favoritos";
        }
      });
    }

    this.favsList = favs;
    localStorage.setItem('favs', JSON.stringify(favs));
    this.actualizarFavs();
  }
  async getAtributos() {
    const result = await fetch('https://digi-api.com/api/v1/attribute');
    if(result.ok){
      const data = await result.json();
      const campos = data['content']['fields'];
      for(let i=0; i<campos.length;i++){
        this.atributos.push({nombre:campos[i]['name']});
      }
    }
  }
  activarFiltros(event:any  ){
    this.filtroActivo = event.target.checked;
  }

  async busqueda(digimon:string){
    this.pages = false;
    this.prevDisabled = true;
    this.nextDisabled = true;
    if (digimon.trim() == ""){
      let url = ""
      if (this.filtroActivo && this.atributoSeleccionado){
        url = `https://digi-api.com/api/v1/digimon?attribute=${this.atributoSeleccionado}&page=${this.index}&pageSize=${this.pageSize}`;
      }
      else{
        url = `https://digi-api.com/api/v1/digimon?page=${this.index}&pageSize=${this.pageSize}`;
      }
      const result = await fetch(url)
      if (result.ok) {
        const data = await result.json();
        this.digimons = data.content.map((item: any) => {
          if(this.favsList.some(fav => fav.name === item.name)){
            return {name: item.name, img: item.image, fav: 'Eliminar de favoritos'};
          }else{
            return {name: item.name, img: item.image, fav: 'Añadir a favoritos'};
          }
        });
        this.pages = true;
        this.prevDisabled = this.index === 0;
        this.nextDisabled = this.index >= data.pageable.totalPages - 1;
      }
      else{
        alert('Erro al obtener los datos')
      }
    }
    else{
      if(!isNaN(Number(digimon))){
        const result = await fetch(`https://digi-api.com/api/v1/digimon/${digimon}`)
        if (result.ok) {
          const data = await result.json();
          if (this.favsList.some(fav => fav.name === data.name)) {
            this.digimons = [{name: data.name, img: data.images[0].href, fav:'Eliminar de favoritos'}];
          }else{
            this.digimons = [{name: data.name, img: data.images[0].href, fav:'Añadir a favoritos'}];
          }
        }else{
          alert('Digimon inexistente');
        }
      }
      else{
        let url = `https://digi-api.com/api/v1/digimon?name=${digimon}&pageSize=${this.pageSize}`;
        if (this.filtroActivo && this.atributoSeleccionado) {
          url += `&attribute=${this.atributoSeleccionado}`;
        }
        const result = await fetch(url);
        if (result.ok) {
          const data = await result.json();
          this.digimons = data.content.map((item: any) => {
            if (this.favsList.some(fav => fav.name === item.name)) {
              return {name: item.name, img: item.image, fav: 'Eliminar de favoritos'};
            }
            else{
              return {name: item.name, img: item.image, fav:'Añadir a favoritos'};
            }
          });
          this.pages = true;
          this.prevDisabled = this.index === 0;
          this.nextDisabled = this.index >= data.pageable.totalPages - 1;

        } else {
          alert("Error en la busqueda por nombre");
        }
      }
    }
    console.log(this.digimons)
  }

  updatePageSize() {
    this.index = 0;
    this.busqueda("");
  }

  prevPage() {
    if (this.index > 0) {
      this.index--;
      this.busqueda("");
    }
  }

  nextPage() {
    this.index++;
    this.busqueda("");
  }
}
