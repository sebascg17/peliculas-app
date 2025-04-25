import { ActorAutoCompleteDTO } from "../actores/actores";
import { CineDTO } from "../cines/cines";
import { GeneroDTO } from "../generos/generos";

export interface PeliculaDTO{
  id: number;
  titulo: string;
  fechaLanzamiento: Date;
  trailer: string;
  poster?: string;
}

export interface PeliculaCreacionDTO{
  titulo: string;
  fechaLanzamiento: Date;
  trailer: string;
  poster?: File;
  generosIds?: number[];
  cinesIds?: number[];
  actores?: ActorAutoCompleteDTO[]
}

export interface PeliculaPostGetDTO{
  generos: GeneroDTO[];
  cines: CineDTO[];
}

export interface LandingPageDTO{
  enCines: PeliculaDTO[];
  proximosEstrenos: PeliculaDTO[];
}

export interface PeliculasPutGetDTO{
  pelicula: PeliculaDTO;
  generosSeleccionados: GeneroDTO[];
  generosNoSeleccionados: GeneroDTO[];
  cinesSeleccionados: CineDTO[];
  cinesNoSeleccionados: CineDTO[];
  actores: ActorAutoCompleteDTO[];

}