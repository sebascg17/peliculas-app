import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO, UsuarioDTO } from './seguridad';
import { Observable, tap } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }
  // Inyectar el servicio HttpClient

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  obtenerUsuariosPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<UsuarioDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<UsuarioDTO[]>(`${this.urlBase}/listadoUsuarios`, { params: queryParams, observe: 'response' });
  }

  hacerAdmin(email: string) {
    return this.http.post(`${this.urlBase}/hacerAdmin`, {email})
  }
  
  removerAdmin(email: string) {
    return this.http.post(`${this.urlBase}/removerAdmin`, {email})
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/registrar`, credenciales)
    .pipe(
      tap(respuestaAutenticacion => this.guardarToken(respuestaAutenticacion))
    )
  }

  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/login`, credenciales)
    .pipe(
      tap(respuestaAutenticacion => this.guardarToken(respuestaAutenticacion))
    )
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) { 
      return ''
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacionDTO): void {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return false;
    } 

    const expiracion = localStorage.getItem(this.llaveExpiracion)!;
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    const esAdmin = this.obtenerCampoJWT('esadmin');
    if (esAdmin) {
      return 'admin';
    } else {
      return '';
    }    
  }
}
