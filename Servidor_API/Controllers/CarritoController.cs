using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Carrito")]
    public class ValuesController : ApiController
    {
        string path= HttpContext.Current.Server.MapPath(@"~/bases/Carrito.json");
        // GET api/values
        [HttpGet]
        public List<Carrito> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = new List<Carrito>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;
            int n_compra = 1;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id || lista[i].Id_cliente == carrito.Id_cliente )
                {
                    n_compra += 1;
                }
            }

            carrito.N_compra = n_compra;
            if (carrito.Id == 0 || carrito.Id_cliente == 0)
            {
                respuesta = "registro necesita cada identificador";
            }
            else if (!existe)
            {
                lista.Add(carrito);
                respuesta = "registro ingresado correctamente, su numero de compra es:"+n_compra.ToString();
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id && lista[i].Id_cliente == carrito.Id_cliente && lista[i].N_compra == carrito.N_compra)
                {
                    lista[i] = carrito;
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
        public string Delete(Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id && lista[i].Id_cliente == carrito.Id_cliente && lista[i].N_compra == carrito.N_compra)
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
