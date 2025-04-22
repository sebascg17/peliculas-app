using PeliculasApi.DTOs;

namespace PeliculasApi.Utilidades
{
    public static class IQueryableExtentions
    {
        public static IQueryable<T> Paginar<T>( this IQueryable<T> queryable, PaginacionDTO paginacion )
        {
            return queryable
                .Skip((paginacion.Pagina - 1) * paginacion.recordsPorPagina)
                .Take(paginacion.recordsPorPagina);
        }
    }
}
