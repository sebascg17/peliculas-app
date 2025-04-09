import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-crear-pelicula',
  imports: [MatButtonModule, FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  generosSeleccionados: SelectorMultipleDTO[] = [];
  
  generosNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Drama'},
    {llave: 2, valor: 'Accion'},
    {llave: 3, valor: 'Comedia'}
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [];
  
  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Florida'},
    {llave: 2, valor: 'Cinepolis'},
    {llave: 3, valor: 'Arkadia'}
  ];

  actoresSeleccionados: ActorAutoCompleteDTO[] = []

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('creando pelicula', pelicula)
  }
}
