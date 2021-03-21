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
    public class Platos_en_MenuController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Platos_en_Menu.json");
        // GET api/values
        [HttpGet]
        public List<Platos_en_Menu> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = new List<Platos_en_Menu>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Platos_en_Menu plato_en_Menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == plato_en_Menu.N_plato)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (plato_en_Menu.N_plato == null)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(plato_en_Menu);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Platos_en_Menu plato_en_Menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == plato_en_Menu.N_plato)
                {
                    lista[i] = plato_en_Menu;
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
        public string Delete(Platos_en_Menu plato_en_Menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == plato_en_Menu.N_plato)
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
