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
        // * Funcion Get de Carrito
        // * @param 
        // * @returns una lista con todos los registros de Carrito
        // */
        [HttpGet]
        public List<Cliente> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Cliente> lista = new List<Cliente>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Cliente>>(jsontext);
            return lista;
        }

        // * Funcion Get que valida si el email y la contraseña ingresada son correctas
        // * @param email, contraseña
        // * @returns el Cliente con quien coincide los parametros sino envia Cliente de cedula 0
        // */
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

        /**
        * Funcion Post de Cliente que añade el registro a la base
        * @param  Cliente
        * @returns un string de respuesta del completado
        */
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
                if (lista[i].Cedula == cliente.Cedula || lista[i].Email==cliente.Email)
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
    }
}
