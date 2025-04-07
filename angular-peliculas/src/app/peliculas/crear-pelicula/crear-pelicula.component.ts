import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";

@Component({
  selector: 'app-crear-pelicula',
  imports: [MatButtonModule, FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('creando pelicula', pelicula)
  }
}
