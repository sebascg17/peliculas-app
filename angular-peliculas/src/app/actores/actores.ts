export interface ActorDTO {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  foto?: string;
}
export interface ActorCreacionDTO {
  nombre: string;
  fechaNacimiento: Date;  
  foto?: File;
}

export interface ActorAutoCompleteDTO {
  id: number;
  nombre: string;
  personaje: string;  
  foto?: string;
}
