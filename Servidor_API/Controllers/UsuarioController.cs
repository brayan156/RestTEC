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
        // GET api/values
        [HttpGet]
        public List<Usuario> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = new List<Usuario>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Usuario usuario)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            if (lista == null)
            {
                lista = new List<Usuario>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == usuario.Cedula )
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (usuario.Cedula == 0)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(usuario);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Usuario usuario)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            if (lista == null)
            {
                lista = new List<Usuario>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == usuario.Cedula)
                {
                    lista[i] = usuario;
                    jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                    System.IO.File.WriteAllText(path, jsontext);
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                respuesta = "el registro no existe";
            }
            return respuesta;

        }

        // DELETE api/values/5
        [HttpDelete]
        public string Delete(Usuario usuario)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Usuario> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Usuario>>(jsontext);
            if (lista == null)
            {
                lista = new List<Usuario>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == usuario.Cedula)
                {
                    lista.RemoveAt(i);
                    jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                    System.IO.File.WriteAllText(path, jsontext);
                    existe = true;
                    respuesta = "registro eliminado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                respuesta = "el registro no existe";
            }
            return respuesta;
        }
    }
}
