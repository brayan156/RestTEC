namespace Servidor_API.clases
{
    public class Carrito_almacena
    {
        public int Id_carrito { get; set; }
        public int N_plato { get; set; }
        public int N_compra { get; set; }
        public int Cantidad { get; set; }

        public Carrito_almacena()
        {

        }

        public Carrito_almacena(int idCarrito, int nCompra, int nPlato, int cantidad)
        {
            N_plato = nPlato;
            N_compra = nCompra;
            Id_carrito = idCarrito;
            Cantidad = cantidad;
        }

    }
}