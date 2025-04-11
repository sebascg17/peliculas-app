using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using PeliculasApi.Entidades;

namespace PeliculasApi.Controllers
{
    [Route("api/generos")]
    [ApiController]
    public class GenerosController: ControllerBase
    {
        private readonly IRepositorio repositorio;
        private readonly ServicioTransient transient1;
        private readonly ServicioTransient transient2;
        private readonly ServicioScoped scoped1;
        private readonly ServicioScoped scoped2;
        private readonly ServicioSingleton singleton;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IConfiguration configuration;
        private const string cacheTag = "generos";

        public GenerosController (IRepositorio repositorio, 
            ServicioTransient transient1,
            ServicioTransient transient2,
            ServicioScoped scoped1,
            ServicioScoped scoped2,
            ServicioSingleton singleton, IOutputCacheStore outputCacheStore,
            IConfiguration configuration
            )
        {
            this.repositorio = repositorio;
            this.transient1 = transient1;
            this.transient2 = transient2;
            this.scoped1 = scoped1;
            this.scoped2 = scoped2;
            this.singleton = singleton;
            this.outputCacheStore = outputCacheStore;
            this.configuration = configuration;
        }

        [HttpGet("ejemplo-proveedor-configuracion")]
        public string GetEjemploProveedorConfiguracion ()
        {
            return configuration.GetValue<string>("CadenaDeConexion")!;
        }

        [HttpGet("servicios-tiempo-de-vida")]
        public IActionResult GetServiciosTiemposDeVida ()
        {
            return Ok(new
            {
                Transients = new { transient1 = transient1.ObtenerId, transient2 = transient2.ObtenerId },
                Scopeds = new { scoped1 = scoped1.ObtenerId, scoped2 = scoped2.ObtenerId },
                Singletons = singleton.ObtenerId
            });
        }

        [HttpGet] // api/generos
        [HttpGet("listado")] // api/generos/listado
        [HttpGet("/listado-generos")] // listado-generos
        [OutputCache(Tags = [cacheTag])]
        public List<Genero> Get ()
        {
            var generos = repositorio.ObtenerTodosLosGeneros();
            return generos;
        }

        [HttpGet("{id:int}")] // api/genero/1
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<Genero>> Get (int id )
        {
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
            var genero = await repositorio.ObtenerPorId(1);
            return genero;
        }

        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] Genero genero)
        {
            var yaExisteUnGeneroConDichoNombre = repositorio.Existe(genero.Nombre);

            if (yaExisteUnGeneroConDichoNombre)
            {
                return BadRequest($"Ya existe un género con el nombre {genero.Nombre}");
            }

            repositorio.Crear(genero);
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return Ok();
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
