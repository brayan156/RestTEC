namespace Servidor_API.clases
{
    public class Platos_en_Menu
    {

        public int N_plato { get; set; }
        public int N_Menu { get; set; }
        public string Calorias { get; set; }
        public int Precio { get; set; }
        public int Ventas { get; set; }
        public int Ganancia { get; set; }


        public Platos_en_Menu()
        {

        }

        public Platos_en_Menu(int nMenu, int nPlato, string calorias, int precio, int ventas, int ganancia)
        {
            N_plato = nPlato;
            N_Menu = nMenu;
            Calorias = calorias;
            Precio = precio;
            Ventas = ventas;
            Ganancia = ganancia;
        }
    }
}