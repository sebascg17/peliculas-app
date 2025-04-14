using PeliculasApi.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasApi.Entidades
{
    public class Genero
    {
        public int Id {  get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "El campo {0} debe ser {1} caracteres o menos")]
        [PrimeraLetraMayuscula]
        public required string Nombre { get; set; }

    }
}
