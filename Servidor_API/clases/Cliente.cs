namespace Servidor_API.clases
{
    public class Cliente
    {
        public int Cedula { get; set; }
        public string Primer_Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password {  get; set; }
        public string AñoNacimiento  { get; set; }
        public string Mes_Nacimiento { get; set; }
        public string Dia_Nacimiento { get; set; }
        public string Provincia { get; set; }
        public string Canton { get; set; }
        public string Distrito { get; set; }


        public Cliente()
        {

        }

        public Cliente(int cedula,string primerNombre ,string apellido, string email, string password, string añoNacimiento, string mesNacimiento, string diaNacimiento, string provincia, string canton, string distrito)
        {
            Cedula = cedula;
            Primer_Nombre = primerNombre;
            Apellido = apellido;
            Email = email;
            Password = password;
            AñoNacimiento = añoNacimiento;
            Mes_Nacimiento = mesNacimiento;
            Dia_Nacimiento = diaNacimiento;
            Provincia = provincia;
            Canton = canton;
            Distrito = distrito;
        }
    }
}