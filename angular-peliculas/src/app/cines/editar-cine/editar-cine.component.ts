import { Component, Input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [MatButtonModule, FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {
  @Input({transform: numberAttribute})
  id!: number;

  cine: CineDTO = {id: 1, nombre: 'Cinepolis', latitud: 6.163993996859943, longitud: -75.57346106241859 }

  guardarCambios(cine: CineCreacionDTO) {
    console.log('Editando el cine', cine);
  }
}
