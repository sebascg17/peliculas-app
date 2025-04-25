import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";
import { AutocompleteActoresComponent } from "../../actores/autocomplete-actores/autocomplete-actores.component";
import { ActorAutoCompleteDTO } from '../../actores/actores';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';

@Component({
  selector: 'app-formulario-peliculas',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, InputImgComponent, RouterLink, MatDatepickerModule, SelectorMultipleComponent, AutocompleteActoresComponent, CommonModule],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.css'
})
export class FormularioPeliculasComponent implements OnInit {
  
  mostrarCines: boolean = true;
  cineRequeridoError: boolean = false;  
  private _modelo!: PeliculaDTO;

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue({
        titulo: this.modelo.titulo,
        trailer: this.modelo.trailer,
        fechaLanzamiento: moment(this.modelo.fechaLanzamiento).toDate(),
        poster: this.modelo.poster // si es string (URL), tu input-img debe poder manejarlo
      });
    }
  
    this.form.controls.fechaLanzamiento.valueChanges.subscribe(fecha => {
      if (fecha) {
        const fechaSeleccionada = moment(fecha).startOf('day');
        const hoy = moment().startOf('day');
        this.mostrarCines = fechaSeleccionada.isSameOrBefore(hoy);
      } else {
        this.mostrarCines = false;
      }
    });
  }

  @Input({ required: true })
  generosNoSeleccionados!: SelectorMultipleDTO[];

  @Input({ required: true })
  generosSeleccionados!: SelectorMultipleDTO[];

  @Input({ required: true })
  cinesNoSeleccionados!: SelectorMultipleDTO[];

  @Input({ required: true })
  cinesSeleccionados!: SelectorMultipleDTO[];

  @Input({ required: true })
  actoresSeleccionados!: ActorAutoCompleteDTO[];


  @Input()
  set modelo(value: PeliculaDTO) {
    this._modelo = value;
    this.form?.patchValue(value);
  }

  get modelo(): PeliculaDTO {
    return this._modelo;
  }

  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    titulo: this.formBuilder.control<string>('', { validators: [Validators.required, primeraLetraMayuscula()] }),
    fechaLanzamiento: this.formBuilder.control<Date | null>(null, { validators: [Validators.required] }),
    trailer: this.formBuilder.control<string>('', []),
    poster: this.formBuilder.control<File | string | null>(null, { validators: [Validators.required] })
    // generosIds: this.formBuilder.control<number[]>([], Validators.required),
    // // cinesIds: this.formBuilder.control<number[]>([], Validators.required),
    // actores: this.formBuilder.control<ActorAutoCompleteDTO[]>([], Validators.required)
  });

  
  // actualizarGenerosSeleccionados(generos: SelectorMultipleDTO[]) {
  //   this.generosSeleccionados = generos;
  //   this.form.get('generosIds')?.setValue(generos.map(x => x.llave));
  //   this.form.get('generosIds')?.markAsTouched();
  // }
  
  // actualizarCinesSeleccionados(cines: SelectorMultipleDTO[]) {
  //   this.cinesSeleccionados = cines;
  //   this.form.get('cinesIds')?.setValue(cines.map(x => x.llave));
  //   this.form.get('cinesIds')?.markAsTouched();
  // }
  
  // actualizarActoresSeleccionados(actores: ActorAutoCompleteDTO[]) {
  //   this.actoresSeleccionados = actores;
  //   this.form.get('actores')?.setValue(actores);
  //   this.form.get('actores')?.markAsTouched();
  // }

  archivoSeleccionado(file: File) {
    this.form.controls.poster.setValue(file);
  }

  guardarCambios() {  

    if (!this.form.valid) {  // Solo compruebas si el formulario completo es válido
      return;
    }
  
    const pelicula = this.form.value as PeliculaCreacionDTO;
    
    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();
    
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    pelicula.generosIds = generosIds;
    
    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    pelicula.cinesIds = cinesIds;
    
    const actores = this.actoresSeleccionados;  
    pelicula.actores = actores;

    // Validación de cines si la fecha ya pasó
    const fechaSeleccionada = moment(pelicula.fechaLanzamiento).startOf('day');
    const hoy = moment().startOf('day');

    if (fechaSeleccionada.isSameOrBefore(hoy) && pelicula.cinesIds.length === 0) {
      this.cineRequeridoError = true;
      return;
    }

    this.cineRequeridoError = false;
  
    this.posteoFormulario.emit(pelicula);
  }

  obtenerErrorCampoTitulo(): string {
    let campo = this.form.controls.titulo;

    if (campo.hasError('required')) {
      return 'El campo nombre es requerido';
    }
    
    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  obtenerErrorCampoFechaLanzamiento(): string {
    let campo = this.form.controls.fechaLanzamiento;

    if (campo.hasError('required')) {
      return 'El campo fecha lanzamiento es requerido';
    }

    return '';
  }

  obtenerErrorCampoPoster(): string {
    let campo = this.form.controls.poster;

    if (campo.hasError('required')) {
      return 'El campo poster es obligatorio';
    }

    return '';
  }

  // obtenerErrorCampoGeneros(): string {
  //   let campo = this.form.controls.generosIds;

  //   if (campo.hasError('required')) {
  //     return 'Debe seleccionar al menos un género';
  //   }

  //   return '';
  // }

  // obtenerErrorCampoCines(): string {
  //   let campo = this.form.controls.cinesIds;

  //   if (campo.hasError('required')) {
  //     return 'Debe seleccionar al menos un cine';
  //   }

  //   return '';
  // }

  // obtenerErrorCampoActores(): string {
  //   let campo = this.form.controls.actores;

  //   if (campo.hasError('required')) {
  //     return 'Debe seleccionar al menos un actor';
  //   }

  //   return '';
  // }
}
