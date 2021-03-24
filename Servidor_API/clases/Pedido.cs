namespace Servidor_API.clases
{
    public class Pedido
    {
        public int  Numero { get; set; }
        public string Estado { get; set; }
        public int Tiempo_estimado { get; set; }
        public int Tiempo_transcurrido { get; set; }
        public int Tiempo_restante { get; set; }
        public int Cedula_chef_asignado { get; set; }


        public Pedido()
        {

        }

        public Pedido(int numero, string estado, int tiempoEstimado, int tiempoTranscurrido, int tiempo_restante, int cedulaChefAsignado)
        {
            Numero = numero;
            Estado = estado;
            Tiempo_estimado = tiempoEstimado;
            Tiempo_transcurrido = tiempoTranscurrido;
            Tiempo_restante = tiempo_restante;
            Cedula_chef_asignado = cedulaChefAsignado;
        }
    }
}