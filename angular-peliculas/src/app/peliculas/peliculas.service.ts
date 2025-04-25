import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGetDTO, PeliculasPutGetDTO } from './peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/peliculas';

  public obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(`${this.urlBase}/landing`);    
  }

  public crearGet(): Observable<PeliculaPostGetDTO>{
    return this.http.get<PeliculaPostGetDTO>(`${this.urlBase}/postget`);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO> {
    const formData = this.construirFormData(pelicula);
    return this.http.post<PeliculaDTO>(this.urlBase, formData);
  }

  public actualizarGet(id: number): Observable<PeliculasPutGetDTO>{
    return this.http.get<PeliculasPutGetDTO>(`${this.urlBase}/putget/${id}`);
  }

  public actualizar(id: number, pelicula: PeliculaCreacionDTO){
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.urlBase}/${id}`, formData)
  }

  private construirFormData(pelicula: PeliculaCreacionDTO) : FormData{
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento.toISOString().split('T')[0]);

    if (pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    if (pelicula.trailer){
      formData.append('trailer', pelicula.trailer)
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
