import { Component, Input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";

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

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('Editando pelicula', pelicula)
  }
}
