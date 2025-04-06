import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = <string>control.value; // Obtener el valor del control

    if (!valor) return null; // Si el valor está vacío, no hay error
    if (valor.length === 0) return null; // Si el valor está vacío, no hay error

    const primeraLetra = valor.charAt(0);
    if (primeraLetra !== primeraLetra.toUpperCase()) {
      return { 
        primeraLetraMayuscula: {
          mensaje: 'La primera letra debe ser mayúscula' // Mensaje de error personalizado
        } 
      }
    }

    return null; // Si la validación pasa, no hay error
  }
}

export function fechaNoPuedeSerFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaEscogidaPorElUsuario = new Date(control.value);
    const hoy = new Date();

    if (fechaEscogidaPorElUsuario > hoy){
      return {
        futuro: {
          mensaje: 'La fecha no púede ser del futuro'
        }
      }
    }

    return null;
  }
}