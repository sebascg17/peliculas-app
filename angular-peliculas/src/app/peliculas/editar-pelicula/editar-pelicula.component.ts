import { Component, Input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [MatButtonModule, FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({transform: numberAttribute})
  id!: number;

  pelicula: PeliculaDTO = {id: 1, titulo: 'Spider-Man', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'}

    generosSeleccionados: SelectorMultipleDTO[] = [      
      {llave: 2, valor: 'Accion'},
    ];

    generosNoSeleccionados: SelectorMultipleDTO[] = [
      {llave: 1, valor: 'Drama'},
      {llave: 3, valor: 'Comedia'}
    ];

    cinesSeleccionados: SelectorMultipleDTO[] = [      
      {llave: 2, valor: 'Cinepolis'},
    ];

    cinesNoSeleccionados: SelectorMultipleDTO[] = [
      {llave: 1, valor: 'Florida'},
      {llave: 3, valor: 'Arkadia'}
    ];

    actoresSeleccionados: ActorAutoCompleteDTO[] = [
      { id: 2, nombre: 'Christian Bale', personaje: 'Bruce Wayne', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Christian_Bale-7837.jpg/220px-Christian_Bale-7837.jpg'}
    ]
    
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('Editando pelicula', pelicula)
  }
}
