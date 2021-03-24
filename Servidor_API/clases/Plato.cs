namespace Servidor_API.clases
{
    public class Plato
    {
        public int Numero_plato { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Tiempo_preparacion { get; set; }


        public Plato()
        {

        }

        public Plato(int numeroPlato, string nombre, string descripcion, int tiempoPreparacion)
        {
            Numero_plato = numeroPlato;
            Nombre = nombre;
            Descripcion = descripcion;
            Tiempo_preparacion = tiempoPreparacion;


        }
    }
}