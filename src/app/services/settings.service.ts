import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);

}

changeTheme(theme: string){

  const url = `./assets/css/colors/${ theme }.css`;
  this.linkTheme!.setAttribute('href', url);
  localStorage.setItem('theme', url);

  this.checkCurrentTheme();

}

checkCurrentTheme() {

  const links = document.querySelectorAll('.selector');


  links.forEach( elem => {

    // Limpia la clase working (que en este caso es el tick) si existe
    elem.classList.remove('working');
    // Obtengo el valor de todos los elementos con el atibuto 'data-theme'
    const btnTheme = elem.getAttribute('data-theme');
    // para comparar con el valor de linkTheme
    const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
    // Obtengo el atributo href
    const currentTheme = this.linkTheme?.getAttribute('href')

    // Si currentTheme coincide con btnThemeUrl le asigno ese valor a btnTheme
    if( btnThemeUrl === currentTheme ){
      elem.classList.add('working');
    }
  } )

}
}
