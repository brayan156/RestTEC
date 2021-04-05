using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Usuario")]
    public class UsuarioController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Usuario.json");
        // * Funcion Get de Usuario
        // * @param 
        // * @returns una lista con todos los registros de Usuario
        // */
        [HttpGet]
        public List<Usuario> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = new List<Usuario>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            return lista;
        }


        // * Funcion Get que valida si el email y la contraseña ingresada son correctas
        // * @param email, contraseña
        // * @returns el Usuario con quien coincide los parametros sino envia Usuario de cedula 0
        // */
        [Route("Usuario/validar_usuario/{email}/{contraseña}")]
        [HttpGet]
        public Usuario ValidarUsuario(string email, string contraseña)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            if (lista == null)
            {
                lista = new List<Usuario>();
            }
            bool existe = false;
            Usuario usuario = new Usuario();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Email == email & lista[i].Password == contraseña)
                {
                    usuario = lista[i];
                    existe = true;
                    break;
                }
            }

            if (!existe)
            {
                usuario.Cedula = 0;
            }
            return usuario;

        }

    }
}
