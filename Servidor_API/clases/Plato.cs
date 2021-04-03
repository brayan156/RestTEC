namespace Servidor_API.clases
{
    public class Plato
    {
        public int Numero_plato { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Tiempo_preparacion { get; set; }
        public int Ventas { get; set; }
        public int Ganancia { get; set; }

        public Plato()
        {

        }

        public Plato(int numeroPlato, string nombre, string descripcion, int tiempoPreparacion, int ventas, int ganancia)
        {
            Numero_plato = numeroPlato;
            Nombre = nombre;
            Descripcion = descripcion;
            Tiempo_preparacion = tiempoPreparacion;
            Ventas = ventas;
            Ganancia = ganancia;

        }
    }
}