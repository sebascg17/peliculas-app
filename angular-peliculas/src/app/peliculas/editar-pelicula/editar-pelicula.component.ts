import { Component, OnInit } from '@angular/core';
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
  form!: FormGroup;
  id!: number;
  pelicula!: PeliculaDTO;

  generosNoSeleccionados: SelectorMultipleDTO[] = [];
  generosSeleccionados: SelectorMultipleDTO[] = [];

  cinesNoSeleccionados: SelectorMultipleDTO[] = [];
  cinesSeleccionados: SelectorMultipleDTO[] = [];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  mostrarCines = true;
  cineRequeridoError = false;
  errores: string[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
  
    this.peliculasService.actualizarGet(this.id).subscribe(modelo => {
      console.log('Datos recibidos de la película:', modelo);
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
  
      // Creamos el formulario con valores iniciales
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        fechaLanzamiento: ['', Validators.required],
        trailer: [''],
        poster: ['', Validators.required],
        generosIds: [[], Validators.required],
        cinesIds: [[]],
        actores: [[], Validators.required]
      });
  
      // Usamos patchValue para actualizar los campos del formulario con los datos recibidos
      this.form.patchValue({
        titulo: this.pelicula.titulo,
        fechaLanzamiento: this.pelicula.fechaLanzamiento,
        trailer: this.pelicula.trailer,
        poster: this.pelicula.poster,
        generosIds: this.generosSeleccionados.map(x => x.llave),
        cinesIds: this.cinesSeleccionados.map(x => x.llave),
        actores: this.actoresSeleccionados
      });
  
      console.log('Formulario actualizado:', this.form.value);
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO): void {
    this.peliculasService.actualizar(this.id, pelicula).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        this.errores = extraerErrores(err);
      }
    });
  }
}