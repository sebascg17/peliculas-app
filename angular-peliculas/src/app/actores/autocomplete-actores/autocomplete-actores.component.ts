import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActorAutoCompleteDTO } from '../actores';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent {
  control = new FormControl();

  actores: ActorAutoCompleteDTO[] = [
    {
      id: 1, nombre: 'Tom Holland', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tom_Holland_at_KCA_2022.jpg/250px-Tom_Holland_at_KCA_2022.jpg'
    },
    {
      id: 2, nombre: 'Christian Bale', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Christian_Bale-7837.jpg/220px-Christian_Bale-7837.jpg'
    },
    {
      id: 3, nombre: 'Chris Evans', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/ChrisEvans2023.jpg/220px-ChrisEvans2023.jpg'
    }
  ]

  @Input({required: true})
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<ActorAutoCompleteDTO>

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined){
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: ActorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutoCompleteDTO) => a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1)
    this.table.renderRows();
  }

}
