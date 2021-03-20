namespace Servidor_API.clases
{
    public class Carrito_genera
    {
        public int Id_carrito { get; set; }
        public int Id_Factura { get; set; }
        public int Id_pedido { get; set; }
        public int N_compra { get; set; }

        public Carrito_genera()
        {

        }

        public Carrito_genera(int idCarrito, int idPedido, int idFactura, int nCompra)
        {
            Id_Factura = idFactura;
            Id_pedido = idPedido;
            Id_carrito = idCarrito;
            N_compra = nCompra;
        }
    }
}