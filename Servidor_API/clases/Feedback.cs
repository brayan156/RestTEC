namespace Servidor_API.clases
{
    public class Feedback
    {
        public int Calificacion { get; set; }
        public string Año { get; set; }
        public string Mes { get; set; }
        public string Día { get; set; }
        public string Hora { get; set; }
        public int Id_pedido { get; set; }

        public Feedback()
        {

        }

        public Feedback(int calificacion, string año, string mes, string dia, string hora, int idPedido)
        {
            Calificacion = calificacion;
            Año = año;
            Mes = mes;
            Día = dia;
            Hora = hora;
            Id_pedido = idPedido;
        }
    }
}