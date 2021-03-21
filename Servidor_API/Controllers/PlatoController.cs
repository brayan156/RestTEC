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
    public class PlatoController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Plato.json");
        // GET api/values
        [HttpGet]
        public List<Plato> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = new List<Plato>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Plato plato)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            if (lista == null)
            {
                lista = new List<Plato>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_plato == plato.Numero_plato)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (plato.Numero_plato == null)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(plato);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Plato plato)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            if (lista == null)
            {
                lista = new List<Plato>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_plato == plato.Numero_plato)
                {
                    lista[i] = plato;
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
        public string Delete(Plato plato)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            if (lista == null)
            {
                lista = new List<Plato>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_plato == plato.Numero_plato)
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
