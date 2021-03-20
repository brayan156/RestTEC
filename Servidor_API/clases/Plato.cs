namespace Servidor_API.clases
{
    public class Plato
    {
        public string Numero_plato { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }


        public Plato()
        {

        }

        public Plato(string numeroPlato, string nombre, string descripcion)
        {
            Numero_plato = numeroPlato;
            Nombre = nombre;
            Descripcion = descripcion;


        }
    }
}