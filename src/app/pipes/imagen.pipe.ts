import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string | any, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    
    if(img?.includes('https')){
      return img;
  }
  if (img){
      return `${base_url}/upload/${tipo}/${img}`;
  }else{
      return `${base_url}/upload/usuarios/no-image`;
  }

  }

}
