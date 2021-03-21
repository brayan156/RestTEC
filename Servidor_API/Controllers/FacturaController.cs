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
    public class FacturaController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Factura.json");
        // GET api/values
        [HttpGet]
        public List<Factura> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = new List<Factura>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Factura factura)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            if (lista == null)
            {
                lista = new List<Factura>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == factura.Id)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (factura.Id == null)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(factura);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Factura factura)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            if (lista == null)
            {
                lista = new List<Factura>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == factura.Id)
                {
                    lista[i] = factura;
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
        public string Delete(Factura factura)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            if (lista == null)
            {
                lista = new List<Factura>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == factura.Id)
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
