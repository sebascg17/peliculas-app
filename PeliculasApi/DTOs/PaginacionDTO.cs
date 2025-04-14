﻿namespace PeliculasApi.DTOs
{
    public class PaginacionDTO
    {
        public int Pagina { get; set; } = 1;
        public int recordsPorPagina = 10;
        private readonly int cantidadMaximaRecordsPorPagina = 50;

        public int RecordsPorPagina { 
            get { return recordsPorPagina;  }
            set
            {
                recordsPorPagina = (value > cantidadMaximaRecordsPorPagina) ? cantidadMaximaRecordsPorPagina : value;
            }
        }
    }
}
