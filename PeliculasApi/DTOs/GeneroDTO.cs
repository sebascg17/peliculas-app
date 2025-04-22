using PeliculasApi.Entidades;
using PeliculasApi.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasApi.DTOs
{
    public class GeneroDTO: IId
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
    }
}
