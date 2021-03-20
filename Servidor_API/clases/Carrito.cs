namespace Servidor_API.clases
{
    public class Carrito
    {
        public int Id { get; set; }
        public int Monto { get; set; }
        public int N_compra { get; set; }
        public int Id_cliente { get; set; }

        public Carrito()
        {

        }

        public Carrito(int id,int nCompra, int monto, int idCliente)
        {
            Monto = monto;
            N_compra = nCompra;
            Id = id;
            Id_cliente = idCliente;
        }
    }
}
