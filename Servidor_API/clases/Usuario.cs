namespace Servidor_API.clases
{
    public class Usuario
    {
        public int Cedula { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }


        public Usuario()
        {

        }

        public Usuario(int cedula, string email, string password,string rol)
        {
            Cedula = cedula;
            Email = email;
            Password = password;
            Rol = rol;
        }
    }
}