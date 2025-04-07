import { Component, Input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO, GeneroDTO } from '../generos';

@Component({
  selector: 'app-editar-genero',
  imports: [MatButtonModule, FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent {
  @Input({transform: numberAttribute})
  id!: number;

  genero: GeneroDTO = {id: 1, nombre: 'Comedia'};

  guardarCambios(genero: GeneroCreacionDTO) {
    console.log('Editando el genero', genero);
  }
}
