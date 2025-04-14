import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo); // Cargar los valores del modelo en el formulario
    }

  }

  @Input()
  modelo?: GeneroDTO;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDTO>() // Aquí puedes definir el tipo de evento que emites al enviar el formulario


  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(50)]}], // Validación personalizada para la primera letra mayúscula
    // Otros campos del formulario
  });

  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')) {
      return 'El campo nombre es requerido';
    }

    if (nombre.hasError('maxLength')){
      return `El campo nombre no puede tener más de ${nombre.getError('maxLength').requiredLength} caracteres`;      
    }

    if (nombre.hasError('primeraLetraMayuscula')) {
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  guardarCambios() {
    if (!this.form.valid) {
      return; // Si el formulario no es válido, no hacemos nada
    }

    const genero = this.form.value as GeneroCreacionDTO; // Asegúrate de que el tipo sea correcto
    this.posteoFormulario.emit(genero); // Emitimos el evento con el valor del formulario
  }

}
