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
    public class FeedbackController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Feedback.json");
        // GET api/values
        [HttpGet]
        public List<Feedback> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = new List<Feedback>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Feedback feedback)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            if (lista == null)
            {
                lista = new List<Feedback>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_pedido == feedback.Id_pedido)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (feedback.Id_pedido == null)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(feedback);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Feedback feedback)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            if (lista == null)
            {
                lista = new List<Feedback>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_pedido == feedback.Id_pedido)
                {
                    lista[i] = feedback;
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
        public string Delete(Feedback feedback)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            if (lista == null)
            {
                lista = new List<Feedback>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_pedido == feedback.Id_pedido)
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
