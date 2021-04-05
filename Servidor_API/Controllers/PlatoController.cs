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
    [Route("Plato")]
    public class PlatoController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Plato.json");
        // * Funcion Get de Plato
        // * @param 
        // * @returns una lista con todos los registros de Plato
        // */
        [HttpGet]
        public List<Plato> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = new List<Plato>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            return lista;
        }


        /**
        * Funcion Post de Plato que añade el registro a la base
        * @param  Plato
        * @returns un string de respuesta del completado
        */
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
            int n_plato = 0;
            for (int i = 0; i < lista.Count; i++)
            {
                if (n_plato < lista[i].Numero_plato)
                {
                    n_plato = lista[i].Numero_plato;
                }

                if (lista[i].Descripcion == plato.Descripcion && lista[i].Nombre == plato.Nombre)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

             if (!existe)
            {
                plato.Numero_plato = n_plato + 1;
                lista.Add(plato);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        /**
        // * Funcion Put de Plato que edita el registro de la base
        // * @param  Plato
        // * @returns un string de respuesta del completado
        // */
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


        /**
        // * Funcion Put de Plato que suma las ganancias y ventas de una lista de platos
        // * @param  lista de Platos
        // * @returns un string de respuesta del completado
        // */
        [Route("Plato/sumarganancias")]
        [HttpPut]
        public string sumarganancias([FromBody] Plato[] platos)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Plato> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Plato>>(jsontext);
            if (lista == null)
            {
                lista = new List<Plato>();
            }

            bool existe = false;

            for (int j = 0; j < platos.Length; j++)
            {
                for (int i = 0; i < lista.Count; i++)
                {
                    if (lista[i].Numero_plato == platos[j].Numero_plato)
                    {
                        lista[i].Ganancia += platos[j].Ganancia;
                        lista[i].Ventas += platos[j].Ventas;
                        existe = true;
                        respuesta = "registro editado exitosamente";
                    }
                }
            }
            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;

            }



        /**
        // * Funcion Delete de Menu que elimina el registro de la base
        // * @param  numero_plato
        // * @returns un string de respuesta del completado
        // */
        [Route("Plato/{numero_plato:int}")]
        [HttpDelete]
        public string Delete(int numero_plato)
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
                if (lista[i].Numero_plato == numero_plato)
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
