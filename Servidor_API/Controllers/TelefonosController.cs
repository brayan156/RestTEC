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
    [Route("Telefonos")]
    public class TelefonosController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Telefonos.json");
        // GET api/values
        [HttpGet]
        public List<Telefonos> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = new List<Telefonos>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Telefonos telefonos)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            if (lista == null)
            {
                lista = new List<Telefonos>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].ID_cliente == telefonos.ID_cliente && lista[i].Telefono == telefonos.Telefono)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (telefonos.ID_cliente == 0 || telefonos.Telefono == 0)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(telefonos);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Telefonos telefonos)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            if (lista == null)
            {
                lista = new List<Telefonos>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].ID_cliente == telefonos.ID_cliente && lista[i].Telefono == telefonos.Telefono)
                {
                    lista[i] = telefonos;
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
        public string Delete(Telefonos telefonos)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            if (lista == null)
            {
                lista = new List<Telefonos>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].ID_cliente == telefonos.ID_cliente && lista[i].Telefono == telefonos.Telefono)
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
