import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';

import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { MostrarErroresComponent } from '../../compartidos/componentes/mostrar-errores/mostrar-errores.component';
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';

import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [
    MatButtonModule,
    FormularioPeliculasComponent,
    MostrarErroresComponent,
    CargandoComponent
  ],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit {
  ngOnInit(): void {  
    this.peliculasService.actualizarGet(this.id).subscribe(modelo => {
      this.pelicula = modelo.pelicula;
      this.actoresSeleccionados = modelo.actores;
  
      this.cinesNoSeleccionados = modelo.cinesNoSeleccionados.map(cine => {
        return <SelectorMultipleDTO>{ llave: cine.id, valor: cine.nombre };
      });
  
      this.cinesSeleccionados = modelo.cinesSeleccionados.map(cine => {
        return <SelectorMultipleDTO>{ llave: cine.id, valor: cine.nombre };
      });
  
      this.generosNoSeleccionados = modelo.generosNoSeleccionados.map(genero => {
        return <SelectorMultipleDTO>{ llave: genero.id, valor: genero.nombre };
      });
  
      this.generosSeleccionados = modelo.generosSeleccionados.map(genero => {
        return <SelectorMultipleDTO>{ llave: genero.id, valor: genero.nombre };
      });  
    }); 
  }

  @Input({ transform: numberAttribute })
  id!: number;

  pelicula!: PeliculaDTO;
  generosNoSeleccionados!: SelectorMultipleDTO[];
  generosSeleccionados!: SelectorMultipleDTO[];
  cinesNoSeleccionados!: SelectorMultipleDTO[];
  cinesSeleccionados!: SelectorMultipleDTO[];
  actoresSeleccionados!: ActorAutoCompleteDTO[];

  peliculasService = inject(PeliculasService);
  router = inject(Router);
  errores: string[] = [];  

  guardarCambios(pelicula: PeliculaCreacionDTO): void {
    this.peliculasService.actualizar(this.id, pelicula).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: err => {
        this.errores = extraerErrores(err);
      }
    });
  }
}