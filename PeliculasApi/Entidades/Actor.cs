using Microsoft.EntityFrameworkCore;
using PeliculasApi.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasApi.Entidades
{
    public class Actor: IId
    {
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        [PrimeraLetraMayuscula]
        public required string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        [Unicode(false)]
        public string? Foto { get; set; }
    }
}
