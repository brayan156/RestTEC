namespace Servidor_API.clases
{
    public class Feedback
    {
        public int Calificacion { get; set; }
        public string Year { get; set; }
        public string Mes { get; set; }
        public string Dia { get; set; }
        public string Hora { get; set; }
        public int Id_pedido { get; set; }

        public Feedback()
        {

        }

        public Feedback(int calificacion, string año, string mes, string dia, string hora, int idPedido)
        {
            Calificacion = calificacion;
            Year = año;
            Mes = mes;
            Dia = dia;
            Hora = hora;
            Id_pedido = idPedido;
        }
    }
}