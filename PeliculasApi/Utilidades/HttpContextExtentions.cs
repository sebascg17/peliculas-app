using Microsoft.EntityFrameworkCore;

namespace PeliculasApi.Utilidades
{
    public static class HttpContextExtentions // Changed to static to fix CS1106
    {
        public async static Task InsertarParametrosPaginacionEnCabecera<T> ( this HttpContext httpContext, IQueryable<T> queryable )
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            double cantidad = await queryable.CountAsync();
            httpContext.Response.Headers.Append("cantidad-total-registros", cantidad.ToString());
        }
    }
}
