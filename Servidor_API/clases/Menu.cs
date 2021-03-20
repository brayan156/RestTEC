namespace Servidor_API.clases
{
    public class Menu
    {
        public int Numero_menu { get; set; }

        public string Tipo { get; set; }



        public Menu()
        {

        }

        public Menu(int numeroMenu, string tipo)
        {
            Numero_menu = numeroMenu;
            Tipo = tipo;


        }
    }
}