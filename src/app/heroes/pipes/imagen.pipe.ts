import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../pages/heroe/interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  pure: true
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string  {
    if(!heroe.id && !heroe.alt_img) {
      return  `assets/no-image.png`;
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    }

    return `assets/heroes/${heroe.id}.jpg`;
  }

}
