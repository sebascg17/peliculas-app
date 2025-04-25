import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorMultipleDTO } from './SelectorMultipleModelo';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-selector-multiple',
  imports: [MatButtonModule],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

  @Input({ required: true })
  Seleccionados!: SelectorMultipleDTO[];

  @Input({ required: true })
  NoSeleccionados!: SelectorMultipleDTO[];

  @Output()
  seleccionados = new EventEmitter<SelectorMultipleDTO[]>();

  seleccionar(elemento: SelectorMultipleDTO, indice: number) {
    this.Seleccionados.push(elemento);
    this.NoSeleccionados.splice(indice, 1);
    this.emitirSeleccionados();
  }

  deseleccionar(elemento: SelectorMultipleDTO, indice: number) {
    this.NoSeleccionados.push(elemento);
    this.Seleccionados.splice(indice, 1);
    this.emitirSeleccionados();
  }

  seleccionarTodo() {
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados.length = 0;
    this.emitirSeleccionados();
  }

  deseleccionarTodo() {
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados.length = 0;
    this.emitirSeleccionados();
  }

  private emitirSeleccionados() {
    this.seleccionados.emit(this.Seleccionados);
  }
}