namespace Servidor_API.clases
{
    public class Telefonos
    {
        public int ID_cliente { get; set; }
        public int Telefono { get; set; }


        public Telefonos()
        {

        }

        public Telefonos(int idCliente, int telefono)
        {
            ID_cliente = idCliente;
            Telefono = telefono;
        }
    }
}