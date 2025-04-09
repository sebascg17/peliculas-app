using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using PeliculasApi.Entidades;

namespace PeliculasApi.Controllers
{
    [Route("api/generos")]
    public class GenerosController: ControllerBase
    {
        [HttpGet] // api/generos
        [HttpGet("listado")] // api/generos/listado
        [HttpGet("/listado-generos")] // listado-generos
        [OutputCache]
        public List<Genero> Get ()
        {
            var repositorio = new RepositorioEnMemoria();
            var generos = repositorio.ObtenerTodosLosGeneros();
            return generos;
        }

        [HttpGet("{id:int}")] // api/genero/1
        [OutputCache]
        public async Task<ActionResult<Genero>> Get (int id )
        {
            var repositorio = new RepositorioEnMemoria();
            var genero = await repositorio.ObtenerPorId(id);
            if ( genero == null )
            {
                return NotFound();
            }
            return genero;
        }

        [HttpGet("{nombre}")] //api/generos/Sebas
        public async Task<Genero?> Get ( string nombre )
        {
            var repositorio = new RepositorioEnMemoria();
            var genero = await repositorio.ObtenerPorId(1);
            return genero;
        }

        [HttpPost]
        public void Post ()
        {

        }

        [HttpPut]
        public void Put () 
        { 
        
        }

        [HttpDelete]
        public void Delete ()
        {

        }
    }
}
