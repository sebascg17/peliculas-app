import { Component, inject, Input, numberAttribute } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { RatingService } from '../../rating/rating.service';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { RatingComponent } from "../../compartidos/componentes/rating/rating.component";

@Component({
  selector: 'app-detalle-pelicula',
  imports: [CargandoComponent, MatChipsModule, RouterLink, MapaComponent, RatingComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {

  @Input({ transform: numberAttribute })
  id!: number; // El ID de la película que se va a mostrar en el detalle

  peliculasService = inject(PeliculasService); // Servicio para obtener datos de películas
  ratingService = inject(RatingService); // Servicio para manejar la puntuación de películas
  seguridadService = inject(SeguridadService)
  pelicula!: PeliculaDTO; // Objeto que contendrá los detalles de la película
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl; // URL del tráiler de la película
  coordenadas: Coordenada[] = []; // Array para almacenar las coordenadas de los cines donde se proyecta la película

  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento); // Convertir la fecha de lanzamiento a un objeto Date
      this.pelicula = pelicula; // Asignar la película obtenida al atributo de clase  
      this.trailerURL = this.generarURLYoutubeEmbed(pelicula.trailer); // Generar la URL del tráiler para el iframe  
      
      this.coordenadas = pelicula.cines!.map(cine => {
        return <Coordenada>{ latitud: cine.latitud, longitud: cine.longitud, texto: cine.nombre }; // Mapear las coordenadas de los cines a un formato adecuado
      });
      
    });
  }

  generarURLYoutubeEmbed(url: string): SafeResourceUrl | string{
    if (!url) {
      return '';
    }

    var videoId = url.split('v=')[1]; // Obtener el ID del video de la URL
    var posicionAmpersand = videoId.indexOf('&'); // Buscar el índice del primer '&' en el ID del video
    if (posicionAmpersand !== -1) {
      videoId = videoId.substring(0, posicionAmpersand); // Si hay un '&', tomar solo la parte antes de él
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`); // Devolver la URL segura para el iframe
  }

  puntuar(puntuacion: number) {
    if (!this.seguridadService.estaLogueado()) {
      Swal.fire('Error', 'Debes iniciar sesión para puntuar la película', 'error'); // Mostrar un mensaje de error si el usuario no está logueado
      return;
      
    }
    
    this.ratingService.puntuar(this.id, puntuacion).subscribe(() => {
      Swal.fire('Exitoso', 'Gracias por tu puntuación', 'success'); // Mostrar un mensaje de éxito al puntuar la película
    });
  }
}
