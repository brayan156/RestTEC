namespace Servidor_API.clases
{
    public class Pedido
    {
        public int  Numero { get; set; }
        public string Estado { get; set; }
        public string Tiempo_estimado { get; set; }
        public string Tiempo_transcurrido { get; set; }
        public string Tiempo_restante { get; set; }
        public int Cedula_chef_asignado { get; set; }


        public Pedido()
        {

        }

        public Pedido(int numero, string estado, string tiempoEstimado, string tiempoTranscurrido, string fecha_nacimiento, int cedulaChefAsignado)
        {
            Numero = numero;
            Estado = estado;
            Tiempo_estimado = tiempoEstimado;
            Tiempo_transcurrido = tiempoTranscurrido;
            Tiempo_restante = fecha_nacimiento;
            Cedula_chef_asignado = cedulaChefAsignado;
        }
    }
}