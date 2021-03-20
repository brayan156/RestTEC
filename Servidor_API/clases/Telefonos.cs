namespace Servidor_API.clases
{
    public class Telefonos
    {
        public int ID_cliente { get; set; }
        public string Telefono { get; set; }


        public Telefonos()
        {

        }

        public Telefonos(int idCliente, string telefono)
        {
            ID_cliente = idCliente;
            Telefono = telefono;
        }
    }
}