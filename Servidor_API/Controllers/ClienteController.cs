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
    [Route("Cliente")]
    public class ClienteController : ApiController
    {
        string path= HttpContext.Current.Server.MapPath(@"~/bases/Cliente.json");
        // GET api/values
        [HttpGet]
        public List<Cliente> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = new List<Cliente>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            return lista;
        }


        [Route("Cliente/validar_cliente/{email}/{contraseña}")]
        [HttpGet]
        public Cliente ValidarCliente(string email,string contraseña)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            if (lista == null)
            {
                lista = new List<Cliente>();
            }
            bool existe = false;
            Cliente cliente = new Cliente();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Email == email & lista[i].Password==contraseña)
                {
                    cliente = lista[i];
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                cliente.Cedula = 0;
            }
            return cliente;

        }

        // POST api/values

        [HttpPost]
        public string Post([FromBody] Cliente cliente)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            if (lista == null)
            {
                lista = new List<Cliente>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == cliente.Cedula)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (cliente.Cedula == 0)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(cliente);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Cliente cliente)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            if (lista == null)
            {
                lista = new List<Cliente>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == cliente.Cedula)
                {
                    lista[i] = cliente;
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
        [Route("Cliente/{cedula:int}")]
        [HttpDelete]
        public string Delete(int cedula)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            if (lista == null)
            {
                lista = new List<Cliente>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Cedula == cedula)
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
